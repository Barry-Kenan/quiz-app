import { FinishQuiz, QuestionsForm, QuestionsPagination } from 'components';
import { useAppSelector } from 'hooks/redux';
import { FC, useRef, useState } from 'react';

const GamePage: FC = () => {
	const [isLastPage, setIsLastPage] = useState<boolean>(false);
	const [isValid, setIsValid] = useState<boolean>(false);
	const { status } = useAppSelector(state => state.quizReducer);

	const ref = useRef<HTMLDivElement>();

	return (
		<div>
			<QuestionsForm
				isLastPage={isLastPage}
				questionsDivRef={ref}
				setIsValid={setIsValid}
			/>
			<QuestionsPagination
				isLastPage={isLastPage}
				setIsLastPage={setIsLastPage}
				isValid={isValid}
				questionsDivRef={ref}
			/>
			{status == 'finish' && <FinishQuiz />}
		</div>
	);
};

export default GamePage;
