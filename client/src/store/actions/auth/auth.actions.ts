import { IUser } from 'interfaces/user.interface';
import { AuthAction, AuthActionEnum } from 'store/action-types/auth/auth.types';

const setUser = (payload: Omit<IUser, 'password'>): AuthAction => ({
	type: AuthActionEnum.SET_USER,
	payload
});

const login = (payload: Omit<IUser, 'id' | 'name'>): AuthAction => ({
	type: AuthActionEnum.LOGIN,
	payload
});

const register = (payload: Omit<IUser, 'id'>): AuthAction => ({
	type: AuthActionEnum.REGISTER,
	payload
});

const logout = (): AuthAction => ({
	type: AuthActionEnum.LOGOUT
});

const logoutUser = (): AuthAction => ({
	type: AuthActionEnum.LOGOUT_USER
});

const setError = (payload: string): AuthAction => ({
	type: AuthActionEnum.SET_ERROR,
	payload
});

const auth = (): AuthAction => ({
	type: AuthActionEnum.AUTH
});

export const authActions = {
	setUser,
	login,
	register,
	logout,
	logoutUser,
	setError,
	auth
};
