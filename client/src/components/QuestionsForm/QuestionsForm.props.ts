import { MutableRefObject } from 'react';
export interface QuestionsFormProps {
	questionsDivRef: MutableRefObject<HTMLDivElement>;
	isLastPage: boolean;
	setIsValid: (isValid: boolean) => void;
}
