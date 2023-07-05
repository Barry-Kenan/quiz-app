import { quizApi } from 'helpers/api/api';
import { Question } from 'interfaces/question.interface';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { quizActions } from 'store/reducers/quiz/quiz.actions';
import { QuizActionEnum } from 'store/reducers/quiz/quiz.types';

export function* getQuestionsSaga() {
	yield put(quizActions.loading(true));
	const data: Question[] = yield quizApi.getQuestions();

	yield put(quizActions.setQuestions(data));
	yield put(quizActions.loading(false));
}

function* watchGetQuestions() {
	yield takeEvery(QuizActionEnum.GET_QUESTIONS, getQuestionsSaga);
}

export default function* quizSaga() {
	yield all([fork(watchGetQuestions)]);
}
