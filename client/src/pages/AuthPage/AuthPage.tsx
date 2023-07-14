import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useActions } from 'hooks/action';
import LoginPage from 'pages/LoginPage/LoginPage';
import RegisterPage from 'pages/RegisterPage/RegisterPage';
import { FC, useEffect, useState } from 'react';
import styles from './AuthPage.module.scss';

/**
 * Компонент авторизации
 */
const AuthPage: FC = () => {
	const { auth, changeStatus } = useActions();
	const [modal, setModal] = useState<null | 'login' | 'register'>(null);

	useEffect(() => {
		changeStatus('start');
		auth();
	}, []);

	const handleCancel = () => {
		setModal(null);
	};

	return (
		<div className={styles.wrapper}>
			<Button type='link' size='large' onClick={() => setModal('login')}>
				Login <LoginOutlined />
			</Button>
			<Button type='link' size='large' onClick={() => setModal('register')}>
				Register <UserAddOutlined />
			</Button>
			<Modal
				open={!!modal}
				onCancel={handleCancel}
				centered
				footer={null}
				closeIcon={true}
			>
				{modal == 'login' && <LoginPage />}
				{modal == 'register' && <RegisterPage />}
			</Modal>
		</div>
	);
};

export default AuthPage;
