import { MutableRefObject } from 'react';
export interface QuestionsFormProps {
	questionsDivRef: MutableRefObject<HTMLDivElement>;
	isLastPage: boolean;
}
