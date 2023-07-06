import { Typography } from 'antd';
import { useAppSelector } from 'hooks/redux';
import { FC } from 'react';
import styles from './FinishQuiz.module.scss';

const { Title, Text } = Typography;

const FinishQuiz: FC = () => {
	const { count, questionsCount } = useAppSelector(state => state.quizReducer);

	return (
		<div className={styles.wrapper}>
			<Title level={2} className={styles.title}>
				Игра окончена
			</Title>
			<Text mark>Правильных ответов: {count}</Text>
			<Text mark>Неправильных ответов: {questionsCount - count}</Text>
		</div>
	);
};

export default FinishQuiz;
