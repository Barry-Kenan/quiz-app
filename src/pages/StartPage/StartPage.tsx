import { Button, Typography } from 'antd';
import { useActions } from 'hooks/action';
import { FC } from 'react';
import styles from './StartPage.module.scss';

const { Title } = Typography;

const StartPage: FC = () => {
	const { changeStatus } = useActions();
	const handleClick = () => {
		changeStatus('play');
	};
	return (
		<div className={styles.wrapper}>
			<Title level={2}>Quiz</Title>
			<Button type='primary' className={styles.button} onClick={handleClick}>
				Start Game
			</Button>
		</div>
	);
};

export default StartPage;
