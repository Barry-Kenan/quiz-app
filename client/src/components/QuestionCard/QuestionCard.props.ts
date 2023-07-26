import { IChoice } from 'interfaces/question.interface';

export interface QuestionCardProps {
	title: string;
	choices: IChoice[];
	checked: string;
	setChecked: (checked: string) => void;
}
