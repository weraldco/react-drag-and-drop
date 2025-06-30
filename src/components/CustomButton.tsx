import type { ButtonHTMLAttributes } from 'react';

type Props = {
	label: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const CustomButton = ({ label, ...buttonProps }: Props) => {
	return <button {...buttonProps}>{label}</button>;
};

export default CustomButton;
