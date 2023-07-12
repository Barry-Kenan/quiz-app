import { quizApi } from 'helpers/api/api';
import { IAnswers } from 'interfaces/answers.interface';
import { QuestionsData } from 'interfaces/question.interface';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import {
	GetQuestions,
	QuizActionEnum
} from 'store/action-types/quiz/quiz.types';
import { rootActions } from 'store/actions';

const { quizActions } = rootActions;

export function* getQuestionsSaga({ payload }: GetQuestions) {
	yield put(quizActions.loading(true));
	const data: QuestionsData = yield quizApi.getQuestions(
		payload.page,
		payload.pageSize
	);
	const answers: IAnswers = yield quizApi.getAnswers();
	yield put(quizActions.changeQuestionsCount(data.totalCount));
	yield put(quizActions.setQuestions(data.questions));
	yield put(quizActions.setAnswers(answers));
	yield put(quizActions.loading(false));
}

function* watchGetQuestions() {
	yield takeEvery(QuizActionEnum.GET_QUESTIONS, getQuestionsSaga);
}

export default function* quizSaga() {
	yield all([fork(watchGetQuestions)]);
}
