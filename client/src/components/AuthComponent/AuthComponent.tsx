import { Card, Typography, notification } from 'antd';
import { LoginForm, RegistrationForm } from 'components';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthComponent.module.scss';
import { AuthComponentProps } from './AuthComponent.props';

const { Title } = Typography;
const AuthComponent: FC<AuthComponentProps> = ({ component }) => {
	const [api, contextHolder] = notification.useNotification();
	const { error } = useAppSelector(state => state.authReducer);
	const { setError, auth } = useActions();

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

	useEffect(() => {
		auth();
	}, []);

	return (
		<div className={styles.wrapper}>
			{contextHolder}
			<Card>
				<Title level={2} underline type='secondary' className={styles.title}>
					{component == 'login' ? 'Логин' : 'Регистрация'}
				</Title>
				{component == 'login' ? <LoginForm /> : <RegistrationForm />}
				{component == 'login' ? (
					<Link to={'/register'}>Регистрация</Link>
				) : (
					<Link to={'/login'}>Логин</Link>
				)}
			</Card>
		</div>
	);
};

export default AuthComponent;
