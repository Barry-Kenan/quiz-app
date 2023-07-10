import cn from 'classnames';
import styles from './Footer.module.scss';
import { FooterProps } from './Footer.props';

const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<span>Barry Kenan</span>
		</footer>
	);
};

export default Footer;
