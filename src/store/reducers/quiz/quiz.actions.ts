import { Question } from 'interfaces/question.interface';
import { QuizAction, QuizActionEnum, Status } from './quiz.types';

const changeScore = (payload: number): QuizAction => ({
	type: QuizActionEnum.CHANGE_SCORE,
	payload
});

const changeStatus = (payload: Status): QuizAction => ({
	type: QuizActionEnum.CHANGE_STATUS,
	payload
});

const loading = (payload: boolean): QuizAction => ({
	type: QuizActionEnum.LOADING,
	payload
});

const setQuestions = (payload: Question[]): QuizAction => ({
	type: QuizActionEnum.SET_QUESTIONS,
	payload
});

const getQuestionsAction = (): QuizAction => ({
	type: QuizActionEnum.GET_QUESTIONS
});

export const quizActions = {
	changeScore,
	changeStatus,
	loading,
	setQuestions,
	getQuestionsAction
};
