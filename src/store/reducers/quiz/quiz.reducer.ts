import { Question } from 'interfaces/question.interface';
import { QuizAction, QuizActionEnum, Status } from './quiz.types';

interface QuizState {
	loading: boolean;
	count: number;
	status: Status;
	questions: Question[];
	questionsCount: number;
}

const initialState: QuizState = {
	loading: false,
	count: 0,
	status: 'start',
	questions: [],
	questionsCount: 0
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
		case QuizActionEnum.CHANGE_QUESTIONS_COUNT:
			return { ...state, questionsCount: action.payload };
		default:
			return state;
	}
};

export default quizReducer;
