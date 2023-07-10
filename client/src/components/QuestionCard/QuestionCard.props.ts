import { Choice } from 'interfaces/question.interface';

export interface QuestionCardProps {
	title: string;
	choices: Choice[];
	checked: string;
	setChecked: (checked: string) => void;
}
