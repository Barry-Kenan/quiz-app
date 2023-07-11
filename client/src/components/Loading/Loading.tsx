import { Spin } from 'antd';
import { FC } from 'react';
import styles from './Loading.module.scss';

/**
 * Компонент Загрузки
 * @returns Спиннер
 */
const Loading: FC = () => {
	return (
		<div className={styles.loading}>
			<Spin size='large' />
		</div>
	);
};

export default Loading;