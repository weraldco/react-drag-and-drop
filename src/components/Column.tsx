import { useDroppable } from '@dnd-kit/core';
import type { ColumnsT } from '../../store/columnStore';
import type { TaskT } from '../../store/taskStore';
import AddColumnBtn from './AddColumnBtn';
import Task from './Task';

interface Props {
	column: ColumnsT;
	tasks: TaskT[];
	setShow: () => void;
	setId: (id: string) => void;
}

const Column = ({ column, tasks, setShow, setId }: Props) => {
	const { setNodeRef } = useDroppable({ id: column.slug });
	return (
		<div
			ref={setNodeRef}
			className=" bg-neutral-700/50 rounded-xl flex flex-col w-full p-4 gap-4 min-h-[200px]"
		>
			<div className="font-bold rounded-t ">{column.title}</div>
			<div className="flex flex-col gap-4">
				{tasks.map((task) => {
					return <Task key={task.id} task={task} />;
				})}
				<AddColumnBtn
					className=" py-2 bg-teal-500 w-full rounded hover:bg-teal-400 duration-200 active:bg-teal-600 "
					setShow={() => {
						setShow();
						setId(column.slug);
					}}
				>
					Add task
				</AddColumnBtn>
			</div>
		</div>
	);
};

export default Column;
