import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { Loading } from 'components';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import { Auth } from 'modules';
import { FC, useEffect, useState } from 'react';
import styles from './AuthPage.module.scss';

/**
 * Компонент авторизации
 */
const AuthPage: FC = () => {
	const { auth } = useActions();
	const { loading } = useAppSelector(state => state.authReducer);
	const [modal, setModal] = useState<null | 'login' | 'register'>(null);

	useEffect(() => {
		auth();
	}, []);

	const handleCancel = () => {
		setModal(null);
	};

	const handleSetRegister = () => {
		setModal('register');
	};

	const handleSetLogin = () => {
		setModal('login');
	};

	if (loading) {
		return (
			<div className={styles.wrapper}>
				<Loading />
			</div>
		);
	}

	return (
		<div className={styles.wrapper}>
			<Button
				className={styles.button}
				type='link'
				size='large'
				onClick={handleSetLogin}
			>
				Логин <LoginOutlined />
			</Button>
			<Button
				className={styles.button}
				type='link'
				size='large'
				onClick={handleSetRegister}
			>
				Регистрация <UserAddOutlined />
			</Button>
			<Modal
				open={!!modal}
				onCancel={handleCancel}
				centered
				footer={null}
				closeIcon={true}
			>
				{modal == 'login' && <Auth component='login' />}
				{modal == 'register' && <Auth component='register' />}
			</Modal>
		</div>
	);
};

export default AuthPage;
