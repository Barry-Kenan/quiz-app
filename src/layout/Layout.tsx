import { FunctionComponent } from 'react';
import Footer from './Footer/Footer';
import Header from './Header/Header';
import styles from './Layout.module.scss';
import { LayoutProps } from './Layout.props';

const Layout = ({ children }: LayoutProps) => {
	return (
		<div className={styles.wrapper}>
			<Header className={styles.header} />
			<main className={styles.body} tabIndex={0} role='main'>
				{children}
			</main>
			<Footer className={styles.footer} />
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown>>(
	Component: FunctionComponent<T>
) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<Layout>
				<Component {...props} />
			</Layout>
		);
	};
};
