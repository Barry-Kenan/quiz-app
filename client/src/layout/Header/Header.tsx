import cn from 'classnames';
import styles from './Header.module.scss';
import { HeaderProps } from './Header.props';
import Logo from './logo.svg';

const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
	return (
		<header className={cn(className, styles.header)} {...props}>
			<Logo />
		</header>
	);
};

export default Header;
