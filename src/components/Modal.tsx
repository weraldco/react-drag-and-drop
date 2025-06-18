import type { ReactNode } from 'react';
import { IoIosClose } from 'react-icons/io';

interface Props {
	handleModalShow: () => void;
	children: ReactNode;
	headerTitle: string;
}

const Modal = ({ handleModalShow, children, headerTitle }: Props) => {
	return (
		<div className="w-full h-full fixed bg-neutral-900/50 z-20 flex items-center justify-center ">
			<div className="absolute max-w-2xl w-full bg-neutral-50 rounded-xl text-neutral-600">
				<div className="flex justify-between p-2">
					<span className="text-lg font-bold px-2 py-2">{headerTitle}</span>
					<button
						className="cursor-pointer hover:bg-neutral-200 active:bg-neutral-300 duration-200 rounded-lg"
						onClick={handleModalShow}
					>
						<IoIosClose size={30} />
					</button>
				</div>
				<div>
					{/* Content */}

					{children}
				</div>
			</div>
		</div>
	);
};

export default Modal;
