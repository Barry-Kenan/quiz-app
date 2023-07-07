import { Spin } from 'antd';
import { FC } from 'react';
import styles from './Loading.module.scss';

const Loading: FC = () => {
	return (
		<div className={styles.loading}>
			<Spin tip='Загрузка вопросов...' size='large' />
		</div>
	);
};

export default Loading;
