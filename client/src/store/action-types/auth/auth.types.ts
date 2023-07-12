import { IUser } from 'interfaces/user.interface';

export enum AuthActionEnum {
	SET_USER = 'SET_USER'
}

export interface SetUserAction {
	type: AuthActionEnum.SET_USER;
	payload: Omit<IUser, 'password'>;
}

export type AuthAction = SetUserAction;
