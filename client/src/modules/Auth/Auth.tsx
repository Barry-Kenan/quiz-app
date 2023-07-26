import { Card, Typography, notification } from 'antd';
import { LoginForm, RegistrationForm } from 'components';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import { FC, useEffect } from 'react';
import styles from './Auth.module.scss';
import { AuthProps } from './Auth.props';

const { Title } = Typography;

/**
 * Общий компонент для логина и регистрации
 * @param component: "login" | "register"
 * @returns
 */
const Auth: FC<AuthProps> = ({ component }) => {
	const [api, contextHolder] = notification.useNotification();
	const { error } = useAppSelector(state => state.authReducer);
	const { setError } = useActions();

	// вывод ошибок
	const openNotification = () => {
		api.error({
			message: 'Ошибка',
			description: error
		});
	};

	useEffect(() => {
		if (error) {
			openNotification();
			setError(null);
		}
	}, [error]);

	return (
		<div className={styles.wrapper}>
			{contextHolder}
			<Card>
				<Title level={2} underline type='secondary' className={styles.title}>
					{component == 'login' ? 'Логин' : 'Регистрация'}
				</Title>
				{component == 'login' ? <LoginForm /> : <RegistrationForm />}
			</Card>
		</div>
	);
};

export default Auth;
