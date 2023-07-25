import 'antd/dist/reset.css';
import AuthRoutes from 'helpers/guards/AuthRoutes';
import PrivateRoutes from 'helpers/guards/PrivateRoutes';
import { withLayout } from 'layout/LayoutHOC';
import { AuthPage, Error404, HomePage } from 'pages';
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
				<Route path='*' element={<Error404 />} />
			</Routes>
		</>
	);
};

export default withLayout(App);
