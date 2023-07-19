import { Button, Typography } from 'antd';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import { FC } from 'react';
import styles from './FinishQuiz.module.scss';

const { Title, Text } = Typography;
/**
 * Компонент результатов игры
 * @returns Результаты
 */
const FinishQuiz: FC = () => {
	const { score, questionsCount } = useAppSelector(state => state.quizReducer);
	const { changeStatus } = useActions();
	// вызывается при submit
	const handleClick = () => {
		changeStatus('start');
	};

	return (
		<div className={styles.wrapper}>
			<Title level={2} className={styles.title}>
				Игра окончена
			</Title>
			<Text mark>Правильных ответов: {score}</Text>
			<Text mark>Неправильных ответов: {questionsCount - score}</Text>
			<Button type='primary' size='small' onClick={handleClick}>
				Начать заново
			</Button>
		</div>
	);
};

export default FinishQuiz;
