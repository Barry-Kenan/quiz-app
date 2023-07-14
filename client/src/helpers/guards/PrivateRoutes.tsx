import { useAppSelector } from 'hooks/redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
	const { isAuth } = useAppSelector(state => state.authReducer);

	return isAuth ? <Outlet /> : <Navigate to='/auth' />;
};

export default PrivateRoutes;
