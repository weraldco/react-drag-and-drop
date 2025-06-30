import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosIntances';

interface Props {
	children: ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
	const [loading, setLoading] = useState(true);
	const [auth, setAuth] = useState(false);

	useEffect(() => {
		axiosInstance
			.get(API_PATHS.AUTH.ME)
			.then(() => setAuth(true))
			.catch(() => setAuth(false))
			.finally(() => setLoading(false));
	}, []);

	if (loading) return <div>Loading..</div>;
	return auth ? <div>{children}</div> : <Navigate to="/login" />;
};

export default PrivateRoute;
