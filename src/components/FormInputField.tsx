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
				id={id}
				className="bg-neutral-100 rounded-xl p-2 outline-0 text-neutral-700"
			/>
		</div>
	);
};

export default FormInputField;
