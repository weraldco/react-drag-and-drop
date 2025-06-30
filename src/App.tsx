import { Route, Routes } from 'react-router';
import Dashboard from './pages/dashboard';
import Login from './pages/Login';

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Dashboard />}></Route>
				<Route path="/dashboard" element={<Dashboard />}></Route>
				<Route path="/login" element={<Login />}></Route>
			</Routes>
		</>
	);
}

export default App;
