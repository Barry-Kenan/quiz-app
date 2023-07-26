import cn from 'classnames';
import { FinishQuiz, QuestionsForm, QuestionsPagination } from 'components';
import { useAppSelector } from 'hooks/redux';
import { FC } from 'react';
import styles from './Game.module.scss';
import { GameContextProvider } from './context/Game.context';

/**
 * Компонент игры
 */
const Game: FC = () => {
	const { status } = useAppSelector(state => state.quizReducer);
	return (
		<GameContextProvider>
			<div className={styles.wrapper}>
				<div
					className={cn(styles.questionsBlock, {
						[styles.finish]: status == 'finish'
					})}
				>
					<QuestionsForm />
					<QuestionsPagination />
				</div>
				{status == 'finish' ? <FinishQuiz /> : <></>}
			</div>
		</GameContextProvider>
	);
};

export default Game;
