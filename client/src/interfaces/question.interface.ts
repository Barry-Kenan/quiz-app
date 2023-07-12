import { IAnswers } from './answers.interface';

export interface Question {
	id: keyof IAnswers;
	prompt: string;
	choices: Choice[];
}

export interface Choice {
	id: string;
	content: string;
}

export interface QuestionsData {
	questions: Question[];
	totalCount: number;
}
