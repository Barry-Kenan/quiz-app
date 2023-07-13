import 'antd/dist/reset.css';
import AuthRoutes from 'helpers/guards/AuthRoutes';
import PrivateRoutes from 'helpers/guards/PrivateRoutes';
import { withLayout } from 'layout/Layout';
import { HomePage, LoginPage, RegisterPage } from 'pages';
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
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
				</Route>
				<Route path='*' element={<p>There's nothing here: 404!</p>} />
			</Routes>
		</>
	);
};

export default withLayout(App);
