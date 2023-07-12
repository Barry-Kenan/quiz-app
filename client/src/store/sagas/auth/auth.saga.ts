import { authApi } from 'helpers/api/api';
import { IUser } from 'interfaces/user.interface';
import { all, fork, put, takeEvery } from 'redux-saga/effects';
import { AuthActionEnum, Login } from 'store/action-types/auth/auth.types';
import { authActions } from 'store/actions/auth/auth.actions';

export function* loginSaga({ payload }: Login) {
	const data: Omit<IUser, 'password'> = yield authApi
		.login(payload)
		.then(res => res.data);
	yield put(authActions.setUser(data));
}

function* watchLogin() {
	yield takeEvery(AuthActionEnum.LOGIN, loginSaga);
}

export default function* authSaga() {
	yield all([fork(watchLogin)]);
}
