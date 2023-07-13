import { authApi } from 'helpers/api/api';
import { IUser } from 'interfaces/user.interface';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import {
	AuthActionEnum,
	Login,
	Register
} from 'store/action-types/auth/auth.types';
import { authActions } from 'store/actions/auth/auth.actions';

export function* loginSaga({ payload }: Login) {
	try {
		const data: Omit<IUser, 'password'> = yield authApi
			.login(payload)
			.then(res => res.data);
		yield put(authActions.setUser(data));
	} catch (error) {
		yield put(authActions.setError(error.response.data.message));
	}
}

export function* registerSaga({ payload }: Register) {
	try {
		yield authApi.register(payload);
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { name, ...data } = payload;
		yield put(authActions.login(data));
	} catch (error) {
		yield put(authActions.setError(error.response.data.message));
	}
}

export function* logoutSaga() {
	try {
		yield authApi.logout();
		yield put(authActions.logoutUser());
	} catch (error) {
		yield put(authActions.setError(error.response.data.message));
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

export default function* authSaga() {
	yield all([fork(watchLogin), fork(watchRegister), fork(watchLogout)]);
}
