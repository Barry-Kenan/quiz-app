import 'antd/dist/reset.css';
import { withLayout } from 'layout/LayoutHOC';
import { FC } from 'react';
import AppRouter from './App.router';

const App: FC = () => {
	return <AppRouter />;
};

export default withLayout(App);
