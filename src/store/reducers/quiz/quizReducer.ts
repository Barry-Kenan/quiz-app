import { QuizAction, QuizActionEnum, QuizState } from './types';

const initialState: QuizState = {
	count: 0
};

const quizReducer = (state = initialState, action: QuizAction): QuizState => {
	switch (action.type) {
		case QuizActionEnum.CHANGE_SCORE:
			return { ...state, count: action.payload };
		default:
			return state;
	}
};

export default quizReducer;
