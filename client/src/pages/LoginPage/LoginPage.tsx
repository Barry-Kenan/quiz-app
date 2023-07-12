import { Typography } from 'antd';
import { LoginForm } from 'components';
import { FC } from 'react';
import styles from './LoginPage.module.scss';

const { Title } = Typography;
const LoginPage: FC = () => {
	return (
		<div className={styles.wrapper}>
			<Title level={2} underline type='secondary'>
				Логин
			</Title>
			<LoginForm />
		</div>
	);
};

export default LoginPage;
