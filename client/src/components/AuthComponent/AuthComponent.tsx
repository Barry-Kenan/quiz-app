import { Card, Typography } from 'antd';
import { LoginForm, RegistrationForm } from 'components';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthComponent.module.scss';
import { AuthComponentProps } from './AuthComponent.props';

const { Title, Link: AntLink } = Typography;
const AuthComponent: FC<AuthComponentProps> = ({ component }) => {
	return (
		<div className={styles.wrapper}>
			<Card>
				<Title level={2} underline type='secondary' className={styles.title}>
					{component == 'login' ? 'Логин' : 'Регистрация'}
				</Title>
				{component == 'login' ? <LoginForm /> : <RegistrationForm />}
				{component == 'login' ? (
					<Link to={'/register'}>
						<AntLink>Регистрация</AntLink>
					</Link>
				) : (
					<Link to={'/login'}>
						<AntLink>Логин</AntLink>
					</Link>
				)}
			</Card>
		</div>
	);
};

export default AuthComponent;
