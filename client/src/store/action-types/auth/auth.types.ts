import { IUser } from 'interfaces/user.interface';

export enum AuthActionEnum {
	SET_USER = 'SET_USER',
	LOGOUT_USER = 'LOGOUT_USER',
	LOGIN = 'LOGIN',
	REGISTER = 'REGISTER',
	LOGOUT = 'LOGOUT',
	SET_ERROR = 'SET_ERROR',
	AUTH = 'AUTH'
}

export interface SetUserAction {
	type: AuthActionEnum.SET_USER;
	payload: Omit<IUser, 'password'>;
}

export interface Login {
	type: AuthActionEnum.LOGIN;
	payload: Omit<IUser, 'id' | 'name'>;
}

export interface Register {
	type: AuthActionEnum.REGISTER;
	payload: Omit<IUser, 'id'>;
}

export interface Logout {
	type: AuthActionEnum.LOGOUT;
}

export interface LogoutUser {
	type: AuthActionEnum.LOGOUT_USER;
}

export interface SetError {
	type: AuthActionEnum.SET_ERROR;
	payload: string;
}

export interface Auth {
	type: AuthActionEnum.AUTH;
}

export type AuthAction =
	| SetUserAction
	| Login
	| Register
	| Logout
	| LogoutUser
	| SetError
	| Auth;
