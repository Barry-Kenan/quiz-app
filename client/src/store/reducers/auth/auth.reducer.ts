import { AuthAction, AuthActionEnum } from 'store/action-types/auth/auth.types';

interface AuthState {
	isAuth: boolean;
	name: string;
	id: number;
	email: string;
}

const initialState: AuthState = {
	isAuth: false,
	name: null,
	id: null,
	email: null
};

const authReducer = (state = initialState, action: AuthAction): AuthState => {
	switch (action.type) {
		case AuthActionEnum.SET_USER:
			// eslint-disable-next-line no-case-declarations
			const { email, id, name } = action.payload;
			return { ...state, isAuth: true, email, id, name };
		default:
			return state;
	}
};

export default authReducer;
