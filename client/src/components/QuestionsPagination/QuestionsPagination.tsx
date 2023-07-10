import { Pagination } from 'antd';
import { scrollToTop } from 'helpers/quiz';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import { FC } from 'react';
import styles from './QuestionsPagination.module.scss';
import { QuestionsPaginationProps } from './QuestionsPagination.props';

/**
 *
 * @param isLastPage boolean если страница последняя то true
 * @param isValid boolean валидность формы вопросов
 * @param setIsValid boolean валидность формы
 * @param questionsDivRef ref блока вопросов
 * @returns
 */
const QuestionsPagination: FC<QuestionsPaginationProps> = ({
	isLastPage,
	isValid,
	questionsDivRef,
	setIsLastPage
}) => {
	const { questionsCount } = useAppSelector(state => state.quizReducer);
	const { getQuestionsAction } = useActions();

	// при изменение страницы запрашивает новые вопросы, проверяет страница последняя или нет и скроллит страницу вверх
	const onChange = (page: number, pageSize: number) => {
		getQuestionsAction({ page, pageSize });
		setIsLastPage(questionsCount / pageSize == page);
		scrollToTop(questionsDivRef);
	};

	return (
		<div className={styles.pagination}>
			<Pagination
				defaultCurrent={1}
				total={questionsCount}
				pageSize={5}
				onChange={onChange}
				disabled={!isValid && !isLastPage}
			/>
		</div>
	);
};

export default QuestionsPagination;
