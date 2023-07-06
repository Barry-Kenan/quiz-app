export interface Question {
	id: string;
	prompt: string;
	choices: Choice[];
	answer: string;
}

export interface Choice {
	id: string;
	content: string;
}