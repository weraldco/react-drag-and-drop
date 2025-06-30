import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosIntances';

interface Props {
	children?: ReactNode;
}

const PublicRoute = ({ children }: Props) => {
	const [auth, setAuth] = useState(false);
	const [checking, setChecking] = useState(true);

	useEffect(() => {
		axiosInstance
			.get(API_PATHS.AUTH.ME)
			.then(() => setAuth(true))
			.catch(() => setAuth(false))
			.finally(() => setChecking(false));
	}, []);

	if (checking) return <div>Loading...</div>;
	return auth ? <Navigate to="/dashboard" /> : <div>{children}</div>;
};

export default PublicRoute;
