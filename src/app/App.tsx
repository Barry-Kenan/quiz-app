import { Button } from 'antd';
import 'antd/dist/reset.css';
import { useAppSelector } from 'hooks/redux';
import { withLayout } from 'layout/Layout';
import { FC } from 'react';
import styles from './App.module.scss';

const App: FC = () => {
	const { count } = useAppSelector(state => state.quizReducer);
	return (
		<div className={styles.wrapper}>
			App
			<Button type='primary'>Primary Button</Button>
			{count}
		</div>
	);
};

export default withLayout(App);
