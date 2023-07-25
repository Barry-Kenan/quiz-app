export interface IQuestion {
	id: string;
	prompt: string;
	choices: IChoice[];
	answer: string;
}

export interface IChoice {
	id: string;
	content: string;
}

export interface IQuestionsData {
	questions: IQuestion[];
	totalCount: number;
}
