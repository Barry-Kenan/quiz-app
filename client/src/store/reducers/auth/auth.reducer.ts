import { AuthAction, AuthActionEnum } from 'store/action-types/auth/auth.types';

interface AuthState {
	isAuth: boolean;
	name: string;
	id: string;
	email: string;
	error: string;
}

const initialState: AuthState = {
	isAuth: false,
	name: null,
	id: null,
	email: null,
	error: null
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
	switch (action.type) {
		case AuthActionEnum.SET_USER:
			const { email, id, name } = action.payload;
			return { ...state, isAuth: true, email, id, name };
		case AuthActionEnum.LOGOUT_USER:
			return { ...state, isAuth: false, name: null, id: null, email: null };
		case AuthActionEnum.SET_ERROR:
			return { ...state, error: action.payload };
		default:
			return state;
	}
};

export default authReducer;
