import { IAnswers } from 'interfaces/answers.interface';
import { Question } from 'interfaces/question.interface';
import {
	QuizAction,
	QuizActionEnum,
	Status
} from '../../action-types/quiz/quiz.types';

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

const setAnswers = (payload: IAnswers): QuizAction => ({
	type: QuizActionEnum.SET_ANSWERS,
	payload
});

const getQuestionsAction = (payload: {
	page: number;
	pageSize: number;
}): QuizAction => ({
	type: QuizActionEnum.GET_QUESTIONS,
	payload
});

const changeQuestionsCount = (payload: number): QuizAction => ({
	type: QuizActionEnum.CHANGE_QUESTIONS_COUNT,
	payload
});

export const quizActions = {
	changeScore,
	changeStatus,
	loading,
	setQuestions,
	getQuestionsAction,
	changeQuestionsCount,
	setAnswers
};
