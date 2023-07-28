import { authApi } from 'helpers/api/api';
import { IUser } from 'interfaces/user.interface';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import {
	AuthActionEnum,
	Login,
	Register
} from 'store/action-types/auth/auth.types';
import { quizActions } from 'store/actions/quiz/quiz.actions';
import { authActions } from './../../actions/auth/auth.actions';

export function* loginSaga({ payload }: Login) {
	try {
		yield put(authActions.onSubmit(true));
		const data: Omit<IUser, 'password'> = yield authApi
			.login(payload)
			.then(res => res.data);
		yield put(authActions.setUser(data));
		yield put(authActions.onSubmit(false));
	} catch (error) {
		yield put(authActions.setError(error.response.data.message));
		yield put(authActions.onSubmit(false));
	}
}

export function* registerSaga({ payload }: Register) {
	try {
		yield put(authActions.onSubmit(true));
		yield authApi.register(payload);
		const { name, ...data } = payload;
		yield put(authActions.login(data));
		yield put(authActions.onSubmit(false));
	} catch (error) {
		yield put(authActions.setError(error.response.data.message));
		yield put(authActions.onSubmit(false));
	}
}

export function* logoutSaga() {
	try {
		yield authApi.logout();
		yield put(authActions.logoutUser());
		yield put(quizActions.changeStatus('start'));
	} catch (error) {
		yield put(authActions.setError(error.response.data.message));
	}
}

function* user() {
	try {
		const data: Omit<IUser, 'password'> = yield authApi.user();
		yield put(authActions.setUser(data));
		yield put(authActions.loading(false));
	} catch (error) {
		yield put(authActions.loading(false));
		yield put(authActions.setError(error.response.data.message));
	}
}

function* refresh() {
	try {
		const status: number = yield authApi.refresh().then(res => res.status);
		if (status == 200) {
			yield user();
		}
	} catch {
		yield put(authActions.loading(false));
	}
}

export function* authenticationSaga() {
	try {
		yield put(authActions.loading(true));
		yield refresh();
	} catch (error) {
		error.message;
	}
}

function* watchLogin() {
	yield takeEvery(AuthActionEnum.LOGIN, loginSaga);
}

function* watchRegister() {
	yield takeEvery(AuthActionEnum.REGISTER, registerSaga);
}
function* watchLogout() {
	yield takeEvery(AuthActionEnum.LOGOUT, logoutSaga);
}
function* watchAuth() {
	yield takeEvery(AuthActionEnum.AUTH, authenticationSaga);
}

export default function* authSaga() {
	yield all([
		fork(watchLogin),
		fork(watchRegister),
		fork(watchLogout),
		fork(watchAuth)
	]);
}
