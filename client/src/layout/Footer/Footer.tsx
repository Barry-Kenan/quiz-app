import { GithubOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { FooterProps } from './Footer.props';

const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
	return (
		<footer className={cn(className, styles.footer)} {...props}>
			<Link to='https://github.com/Barry-Kenan' target='_blank'>
				<Space>
					<GithubOutlined />
					Barry_Kenan
				</Space>
			</Link>
		</footer>
	);
};

export default Footer;
