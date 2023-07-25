import { IAnswers } from 'interfaces/answers.interface';
import { IQuestion } from 'interfaces/question.interface';

export enum QuizActionEnum {
	CHANGE_SCORE = 'CHANGE_SCORE',
	CHANGE_STATUS = 'CHANGE_STATUS',
	LOADING_QUESTIONS = 'LOADING_QUESTIONS',
	SET_QUESTIONS = 'SET_QUESTIONS',
	GET_QUESTIONS = 'GET_QUESTIONS',
	CHANGE_QUESTIONS_COUNT = 'CHANGE_QUESTIONS_COUNT',
	SET_ANSWERS = 'SET_ANSWERS'
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

export interface Loading_QUESTIONS {
	type: QuizActionEnum.LOADING_QUESTIONS;
	payload: boolean;
}

export interface SetQuestions {
	type: QuizActionEnum.SET_QUESTIONS;
	payload: IQuestion[];
}

export interface GetQuestions {
	type: QuizActionEnum.GET_QUESTIONS;
	payload: { page: number; pageSize: number };
}

export interface ChangeQuestionsCount {
	type: QuizActionEnum.CHANGE_QUESTIONS_COUNT;
	payload: number;
}

export interface SetAnswers {
	type: QuizActionEnum.SET_ANSWERS;
	payload: IAnswers;
}

export type QuizAction =
	| ChangeScoreAction
	| ChangeStatusAction
	| Loading_QUESTIONS
	| SetQuestions
	| GetQuestions
	| ChangeQuestionsCount
	| SetAnswers;
