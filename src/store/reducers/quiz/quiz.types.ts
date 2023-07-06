import { Question } from 'interfaces/question.interface';

export enum QuizActionEnum {
	CHANGE_SCORE = 'CHANGE_SCORE',
	CHANGE_STATUS = 'CHANGE_STATUS',
	LOADING = 'LOADING_QUESTIONS',
	SET_QUESTIONS = 'SET_QUESTIONS',
	GET_QUESTIONS = 'GET_QUESTIONS',
	CHANGE_QUESTIONS_COUNT = 'CHANGE_QUESTIONS_COUNT'
}

export type Status = 'start' | 'play' | 'finish';

export interface ChangeScoreAction {
	type: QuizActionEnum.CHANGE_SCORE;
	payload: number;
}

export interface ChangeStatusAction {
	type: QuizActionEnum.CHANGE_STATUS;
	payload: Status;
}

export interface Loading {
	type: QuizActionEnum.LOADING;
	payload: boolean;
}

export interface SetQuestions {
	type: QuizActionEnum.SET_QUESTIONS;
	payload: Question[];
}

export interface GetQuestions {
	type: QuizActionEnum.GET_QUESTIONS;
	payload: { page: number; pageSize: number };
}

export interface ChangeQuestionsCount {
	type: QuizActionEnum.CHANGE_QUESTIONS_COUNT;
	payload: number;
}

export type QuizAction =
	| ChangeScoreAction
	| ChangeStatusAction
	| Loading
	| SetQuestions
	| GetQuestions
	| ChangeQuestionsCount;
