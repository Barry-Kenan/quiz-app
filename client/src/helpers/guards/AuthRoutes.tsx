import { useAppSelector } from 'hooks/redux';
import { Navigate, Outlet } from 'react-router-dom';

const AuthRoutes = () => {
	const { isAuth } = useAppSelector(state => state.authReducer);

	return !isAuth ? <Outlet /> : <Navigate to='/' />;
};

export default AuthRoutes;
