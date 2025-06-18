import type { InputHTMLAttributes } from 'react';

type FormInputFieldProps = {
	label: string;
} & InputHTMLAttributes<HTMLInputElement>;

const FormInputField = ({ label, id, ...inputProps }: FormInputFieldProps) => {
	return (
		<div className="flex flex-col">
			<label htmlFor={id} className="flex text-sm text-neutral-500">
				{label}
			</label>
			<input
				{...inputProps}
				type="text"
				id={id}
				className="bg-neutral-200/50 rounded-xl p-2"
			/>
		</div>
	);
};

export default FormInputField;
