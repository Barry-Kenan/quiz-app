import { Question } from 'interfaces/question.interface';
import { IAnswers } from './../../../interfaces/answers.interface';
import { QuizAction, QuizActionEnum, Status } from './quiz.types';

interface QuizState {
	loading: boolean;
	count: number;
	status: Status;
	questions: Question[];
	questionsCount: number;
	answers: IAnswers;
}

const initialState: QuizState = {
	loading: false,
	count: 0,
	status: 'finish',
	questions: [],
	questionsCount: 0,
	answers: null
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
		case QuizActionEnum.SET_ANSWERS:
			return { ...state, answers: action.payload };
		default:
			return state;
	}
};

export default quizReducer;
