import { quizApi } from 'helpers/api/api';
import { IAnswers } from 'interfaces/answers.interface';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { quizActions } from 'store/reducers/quiz/quiz.actions';
import { GetQuestions, QuizActionEnum } from 'store/reducers/quiz/quiz.types';

export function* getQuestionsSaga({ payload }: GetQuestions) {
	yield put(quizActions.loading(true));
	const { data, headers } = yield quizApi.getQuestions(
		payload.page,
		payload.pageSize
	);
	const answers: IAnswers = yield quizApi.getAnswers();
	yield put(quizActions.changeQuestionsCount(headers['x-total-count']));
	yield put(quizActions.setQuestions(data));
	yield put(quizActions.setAnswers(answers));
	yield put(quizActions.loading(false));
}

function* watchGetQuestions() {
	yield takeEvery(QuizActionEnum.GET_QUESTIONS, getQuestionsSaga);
}

export default function* quizSaga() {
	yield all([fork(watchGetQuestions)]);
}
