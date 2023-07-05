import { Question } from 'interfaces/question.interface';
import { QuizAction, QuizActionEnum, Status } from './quiz.types';

interface QuizState {
	loading: boolean;
	count: number;
	status: Status;
	questions: Question[];
}

const initialState: QuizState = {
	loading: false,
	count: 0,
	status: 'start',
	questions: []
};

const quizReducer = (state = initialState, action: QuizAction): QuizState => {
	switch (action.type) {
		case QuizActionEnum.CHANGE_SCORE:
			return { ...state, count: action.payload };
		case QuizActionEnum.CHANGE_STATUS:
			return { ...state, status: action.payload };
		case QuizActionEnum.LOADING:
			return { ...state, loading: action.payload };
		case QuizActionEnum.SET_QUESTIONS:
			return { ...state, questions: action.payload };
		default:
			return state;
	}
};

export default quizReducer;
