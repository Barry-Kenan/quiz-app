import { authApi, quizApi } from 'helpers/api/api';
import { IAnswers } from 'interfaces/answers.interface';
import { IQuestionsData } from 'interfaces/question.interface';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import {
	GetQuestions,
	QuizActionEnum
} from 'store/action-types/quiz/quiz.types';
import { rootActions } from 'store/actions';

const { quizActions } = rootActions;

function* getData(payload: { page: number; pageSize: number }) {
	try {
		yield put(quizActions.loadingQuestions(true));
		const data: IQuestionsData = yield quizApi.getQuestions(
			payload.page,
			payload.pageSize
		);
		const answers: IAnswers = yield quizApi.getAnswers();
		yield put(quizActions.changeQuestionsCount(data.totalCount));
		yield put(quizActions.setQuestions(data.questions));
		yield put(quizActions.setAnswers(answers));
		yield put(quizActions.loadingQuestions(false));
	} catch (error) {
		yield put(quizActions.loadingQuestions(false));
	}
}

export function* getQuestionsSaga({ payload }: GetQuestions) {
	try {
		yield authApi.user();
		yield getData(payload);
	} catch (error) {
		yield authApi.refresh();
		yield getData(payload);
	}
}

function* watchGetQuestions() {
	yield takeEvery(QuizActionEnum.GET_QUESTIONS, getQuestionsSaga);
}

export default function* quizSaga() {
	yield all([fork(watchGetQuestions)]);
}
