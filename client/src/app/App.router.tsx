import AuthRoutes from 'helpers/guards/AuthRoutes';
import PrivateRoutes from 'helpers/guards/PrivateRoutes';
import { Error404 } from 'pages';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { authRoutes, privateRoutes } from 'routes';

const AppRouter: FC = () => {
	return (
		<>
			<Routes>
				<Route element={<PrivateRoutes />}>
					{privateRoutes.map(route => (
						<Route
							path={route.path}
							element={<route.element />}
							key={route.path}
						/>
					))}
				</Route>
				<Route element={<AuthRoutes />}>
					{authRoutes.map(route => (
						<Route
							path={route.path}
							element={<route.element />}
							key={route.path}
						/>
					))}
				</Route>
				<Route path='*' element={<Error404 />} />
			</Routes>
		</>
	);
};

export default AppRouter;
