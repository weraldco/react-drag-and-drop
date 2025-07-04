import type { ReactNode } from 'react';

interface Props {
	setShow: () => void;
	children: ReactNode;
	className: string;
}

const AddColumnBtn = ({ setShow, children, className }: Props) => {
	console.log('Button rerender?');
	return (
		<div className="relative flex items-center justify-center ">
			<button
				onClick={setShow}
				className={`${className} cursor-pointer rounded-full`}
			>
				{children}
			</button>
		</div>
	);
};

export default AddColumnBtn;
