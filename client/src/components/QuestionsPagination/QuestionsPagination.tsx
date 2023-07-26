import { Pagination } from 'antd';
import { scrollToTop } from 'helpers/quiz';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import { GameContext } from 'modules/Game/Game.context';
import { FC, useContext } from 'react';
import styles from './QuestionsPagination.module.scss';

/**
 * @param questionsDivRef ref блока вопросов
 * @param setIsValid boolean валидность формы
 * @returns
 */
const QuestionsPagination: FC = () => {
	const { questionsCount } = useAppSelector(state => state.quizReducer);
	const { getQuestionsAction } = useActions();
	const { questionsDivRef, setIsLastPage } = useContext(GameContext);

	// при изменение страницы запрашивает новые вопросы, проверяет страница последняя или нет и скроллится  вверх
	const onChange = (page: number, pageSize: number) => {
		getQuestionsAction({ page, pageSize });
		setIsLastPage(Math.ceil(questionsCount / pageSize) == page);
		scrollToTop(questionsDivRef);
	};

	return (
		<div className={styles.pagination}>
			<Pagination total={questionsCount} pageSize={5} onChange={onChange} />
		</div>
	);
};

export default QuestionsPagination;
