import { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { store } from 'store';
import { Layout } from './Layout';

export const withLayout = <T extends Record<string, unknown>>(
	Component: FunctionComponent<T>
) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<Provider store={store}>
				<Layout>
					<Component {...props} />
				</Layout>
			</Provider>
		);
	};
};
