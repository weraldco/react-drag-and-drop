interface Props {
	error: string;
}

const ErrorMessage = ({ error }: Props) => {
	return <div className="text-red-400">{error}</div>;
};

export default ErrorMessage;
