import { Button, Typography } from 'antd';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import { FC } from 'react';
import styles from './FinishPage.module.scss';

const { Title, Text } = Typography;

const FinishPage: FC = () => {
	const { count, questionsCount } = useAppSelector(state => state.quizReducer);
	const { changeStatus } = useActions();
	const handleClick = () => {
		changeStatus('start');
	};

	return (
		<div className={styles.wrapper}>
			<Title level={2} className={styles.title}>
				Игра окончена
			</Title>
			<Text mark>Правильных ответов: {count}</Text>
			<Text mark>Неправильных ответов: {questionsCount - count}</Text>
			<Button type='primary' className={styles.button} onClick={handleClick}>
				Начать заново
			</Button>
		</div>
	);
};

export default FinishPage;
