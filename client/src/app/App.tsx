import 'antd/dist/reset.css';
import AuthRoutes from 'helpers/guards/AuthRoutes';
import PrivateRoutes from 'helpers/guards/PrivateRoutes';
import { withLayout } from 'layout/Layout';
import { AuthPage, HomePage } from 'pages';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

const App: FC = () => {
	return (
		<>
			<Routes>
				<Route element={<PrivateRoutes />}>
					<Route path='/' element={<HomePage />} />
				</Route>
				<Route element={<AuthRoutes />}>
					<Route path='/auth' element={<AuthPage />} />
				</Route>
				<Route path='*' element={<p>Страница не найдена: 404!</p>} />
			</Routes>
		</>
	);
};

export default withLayout(App);
