import { LogoutOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import cn from 'classnames';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';
import Logo from './logo.svg';

const { Title } = Typography;
const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	const { isAuth, name } = useAppSelector(state => state.authReducer);
	const { logout } = useActions();
	return (
		<header className={cn(className, styles.header)} {...props}>
			<Logo />
			{isAuth && (
				<div className={styles.block}>
					<Title level={4} mark className={styles.title}>
						{name}
					</Title>
					<Button type='primary' onClick={logout} className={styles.button}>
						Выход <LogoutOutlined />
					</Button>
				</div>
			)}
		</header>
	);
};

export default Header;
