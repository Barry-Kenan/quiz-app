import { MutableRefObject } from 'react';

export interface QuestionsPaginationProps {
	isLastPage: boolean;
	setIsLastPage: (isLastPage: boolean) => void;
	questionsDivRef: MutableRefObject<HTMLDivElement>;
	isValid: boolean;
}
