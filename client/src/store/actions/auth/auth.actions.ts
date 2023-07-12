import { IUser } from 'interfaces/user.interface';
import {
	AuthAction,
	AuthActionEnum
} from './../../action-types/auth/auth.types';

const setUser = (payload: Omit<IUser, 'password'>): AuthAction => ({
	type: AuthActionEnum.SET_USER,
	payload
});

const login = (payload: Omit<IUser, 'id' | 'name'>): AuthAction => ({
	type: AuthActionEnum.LOGIN,
	payload
});

export const authActions = {
	setUser,
	login
};
