import { all, fork } from 'redux-saga/effects';
import authSaga from './auth/auth.saga';
import quizSaga from './quiz/quiz.saga';

export default function* rootSaga() {
	yield all([fork(authSaga), fork(quizSaga)]);
}
