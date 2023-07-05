import { Button, Typography } from 'antd';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import { FC } from 'react';
import styles from './FinishPage.module.scss';

const { Title, Text } = Typography;

const FinishPage: FC = () => {
	const { count } = useAppSelector(state => state.quizReducer);
	const { changeStatus } = useActions();
	const handleClick = () => {
		changeStatus('start');
	};

	return (
		<div className={styles.wrapper}>
			<Title level={2}></Title>
			<Button type='primary' className={styles.button} onClick={handleClick}>
				Restart Game
			</Button>
			<Text mark>Total count is {count}</Text>
		</div>
	);
};

export default FinishPage;
