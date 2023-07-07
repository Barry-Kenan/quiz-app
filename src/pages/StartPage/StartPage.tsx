import { Button, Typography } from 'antd';
import { useActions } from 'hooks/action';
import { FC, useEffect } from 'react';
import styles from './StartPage.module.scss';

const { Title } = Typography;

/**
 * Компонент начальной страницы
 */
const StartPage: FC = () => {
	const { changeStatus, getQuestionsAction } = useActions();

	// при клике меняет статус
	const handleClick = () => {
		changeStatus('play');
	};

	useEffect(() => {
		getQuestionsAction({ page: 1, pageSize: 5 });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className={styles.wrapper}>
			<Title level={2} className={styles.title}>
				Квиз
			</Title>
			<Button type='primary' className={styles.button} onClick={handleClick}>
				Начать Игру
			</Button>
		</div>
	);
};

export default StartPage;
