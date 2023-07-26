import { Button, Typography } from 'antd';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import { FC, useEffect } from 'react';
import styles from './Start.module.scss';

const { Title } = Typography;

/**
 * Компонент начальной страницы
 */
const Start: FC = () => {
	const { changeStatus, getQuestionsAction } = useActions();
	const { loadingQuestions } = useAppSelector(state => state.quizReducer);

	// при клике меняет статус
	const handleClick = () => {
		changeStatus('play');
	};

	useEffect(() => {
		getQuestionsAction({ page: 1, pageSize: 5 });
	}, []);

	return (
		<div className={styles.wrapper}>
			<Title level={2} className={styles.title}>
				Квиз
			</Title>
			<Button
				type='primary'
				className={styles.button}
				onClick={handleClick}
				loading={loadingQuestions}
			>
				Начать Игру
			</Button>
		</div>
	);
};

export default Start;
