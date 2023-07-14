import { MutableRefObject } from 'react';

export interface QuestionsPaginationProps {
	setIsLastPage: (isLastPage: boolean) => void;
	questionsDivRef: MutableRefObject<HTMLDivElement>;
}
