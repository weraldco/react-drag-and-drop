import { IoIosClose } from 'react-icons/io';
import { useModalStore } from '../../store/modalStore';
import AddTaskForm from './Task/AddTaskForm';

type CustomModalT = {
	headerTitle: string;
};

const CustomModal = ({ headerTitle }: CustomModalT) => {
	const isModalOpen = useModalStore((s) => s.isModalOpen);
	const activeColumnId = useModalStore((s) => s.activeColumnId);
	const closeModal = useModalStore((s) => s.closeModal);

	console.log('test', activeColumnId);
	if (!isModalOpen) return null;

	return (
		<div className="w-full h-full fixed bg-neutral-900/50 z-20 flex items-center justify-center ">
			<div className="absolute max-w-2xl w-full bg-neutral-50 rounded-xl text-neutral-600">
				<div className="flex justify-between p-2">
					<span className="text-lg font-bold px-2 py-2">{headerTitle}</span>
					<button
						className="cursor-pointer hover:bg-neutral-200 active:bg-neutral-300 duration-200 rounded-lg"
						onClick={closeModal}
					>
						<IoIosClose size={30} />
					</button>
				</div>
				<div>
					{/* Content */}
					<AddTaskForm id={activeColumnId} />
				</div>
			</div>
		</div>
	);
};

export default CustomModal;
