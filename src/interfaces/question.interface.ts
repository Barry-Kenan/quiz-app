export interface Question {
	title: string;
	prompt: string;
	choices: Choice[];
	answer: string[][];
}

export interface Choice {
	id: string;
	content: string;
}
