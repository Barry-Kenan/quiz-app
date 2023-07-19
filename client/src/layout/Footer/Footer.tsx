import { GithubOutlined } from '@ant-design/icons';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { FooterProps } from './Footer.props';

const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<Link to='https://github.com/Barry-Kenan' target='_blank'>
				<GithubOutlined />
				Barry Kenan
			</Link>
		</footer>
	);
};

export default Footer;
