import cn from 'classnames';
import { FinishQuiz, QuestionsForm, QuestionsPagination } from 'components';
import { useAppSelector } from 'hooks/redux';
import { FC, useRef, useState } from 'react';
import styles from './GamePage.module.scss';

/**
 * Компонент игры
 */
const GamePage: FC = () => {
	const [isLastPage, setIsLastPage] = useState<boolean>(false);
	const { status } = useAppSelector(state => state.quizReducer);

	const ref = useRef<HTMLDivElement>();

	return (
		<div className={styles.wrapper}>
			<div
				className={cn(styles.questionsBlock, {
					[styles.finish]: status == 'finish'
				})}
			>
				<QuestionsForm isLastPage={isLastPage} questionsDivRef={ref} />
				<QuestionsPagination
					setIsLastPage={setIsLastPage}
					questionsDivRef={ref}
				/>
			</div>
			{status == 'finish' ? <FinishQuiz /> : <></>}
		</div>
	);
};

export default GamePage;
