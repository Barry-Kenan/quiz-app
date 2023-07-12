import { IUser } from 'interfaces/user.interface';

export enum AuthActionEnum {
	SET_USER = 'SET_USER',
	LOGIN = 'LOGIN'
}

export interface SetUserAction {
	type: AuthActionEnum.SET_USER;
	payload: Omit<IUser, 'password'>;
}

export interface Login {
	type: AuthActionEnum.LOGIN;
	payload: Omit<IUser, 'id' | 'name'>;
}

export type AuthAction = SetUserAction | Login;
