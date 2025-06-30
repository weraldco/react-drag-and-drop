import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosIntances';
import ErrorMessage from '../components/ErrorMessage';
import FormInputField from '../components/FormInputField';

const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, 'password should be 10 characters long.'),
});

type SignInSchemaT = z.infer<typeof signInSchema>;

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<SignInSchemaT>({ resolver: zodResolver(signInSchema) });

	const onSubmit = async (data: SignInSchemaT) => {
		console.log(data);

		try {
			const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, data);

			console.log(response);
			reset();
		} catch (error) {
			// Handling the axios Error response.
			if (axios.isAxiosError(error)) {
				const message =
					error.response?.data?.message || 'An expected error occured!';
				console.log('Login failed.', message);
				alert(message);
			} else {
				console.log('Unexpected error', error);
			}
		}
	};
	return (
		<div className="w-full items-center justify-center flex flex-col">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="max-w-lg w-full flex flex-col gap-4"
			>
				<FormInputField
					{...register('email')}
					label="Email Address"
					id="email"
					placeholder="Enter your email.."
				/>
				{errors.email && <ErrorMessage error={`${errors.email.message}`} />}
				<FormInputField
					{...register('password')}
					label="Password"
					id="password"
					placeholder="Enter your password.."
					type="password"
				/>
				{errors.password && (
					<ErrorMessage error={`${errors.password.message}`} />
				)}
				<button
					type="submit"
					className="bg-blue-500 p-2 rounded-xl"
					disabled={isSubmitting}
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
