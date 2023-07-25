import { IAnswers } from 'interfaces/answers.interface';
import { IQuestion } from 'interfaces/question.interface';
import {
	QuizAction,
	QuizActionEnum,
	Status
} from 'store/action-types/quiz/quiz.types';

export interface QuizState {
	loadingQuestions: boolean;
	score: number;
	status: Status;
	questions: IQuestion[];
	questionsCount: number;
	answers: IAnswers;
}

const initialState: QuizState = {
	loadingQuestions: false,
	score: 0,
	status: 'start',
	questions: [],
	questionsCount: 0,
	answers: null
};

export const quizReducer = (
	state = initialState,
	action: QuizAction
): QuizState => {
	switch (action.type) {
		case QuizActionEnum.CHANGE_SCORE:
			return { ...state, score: action.payload };
		case QuizActionEnum.CHANGE_STATUS:
			return { ...state, status: action.payload };
		case QuizActionEnum.LOADING_QUESTIONS:
			return { ...state, loadingQuestions: action.payload };
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
