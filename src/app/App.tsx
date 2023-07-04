import { Button } from 'antd';
import 'antd/dist/reset.css';
import { withLayout } from 'layout/Layout';
import { FC } from 'react';
import styles from './App.module.scss';

const App: FC = () => {
	return (
		<div className={styles.wrapper}>
			App
			<Button type='primary'>Primary Button</Button>
		</div>
	);
};

export default withLayout(App);
