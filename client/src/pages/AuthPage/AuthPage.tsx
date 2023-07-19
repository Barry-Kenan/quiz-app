import { LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { Login, Register } from 'components';
import { useActions } from 'hooks/action';
import { FC, useEffect, useState } from 'react';
import styles from './AuthPage.module.scss';

/**
 * Компонент авторизации
 */
const AuthPage: FC = () => {
	const { auth } = useActions();
	const [modal, setModal] = useState<null | 'login' | 'register'>(null);

	useEffect(() => {
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
				{modal == 'login' && <Login />}
				{modal == 'register' && <Register />}
			</Modal>
		</div>
	);
};

export default AuthPage;
