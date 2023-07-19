import { SettingTwoTone } from '@ant-design/icons';
import { Spin } from 'antd';
import { FC } from 'react';
import styles from './Loading.module.scss';

const antIcon = <SettingTwoTone spin style={{ fontSize: 50 }} />;

/**
 * Компонент Загрузки
 * @returns Спиннер
 */
const Loading: FC = () => {
	return (
		<div className={styles.loading}>
			<Spin indicator={antIcon} />
		</div>
	);
};

export default Loading;
