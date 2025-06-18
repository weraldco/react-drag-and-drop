import { useDroppable } from '@dnd-kit/core';
import type { ColumnT, TaskT } from '../utils/types';
import AddColumnBtn from './AddColumnBtn';
import Task from './Task';

interface Props {
	column: ColumnT;
	tasks: TaskT[];
	setShow: () => void;
}

const Column = ({ column, tasks, setShow }: Props) => {
	const { setNodeRef } = useDroppable({ id: column.id });
	return (
		<div
			ref={setNodeRef}
			className=" bg-neutral-700/50 rounded-xl flex flex-col w-full p-4 gap-4"
		>
			<div className="font-bold rounded-t ">{column.title}</div>
			<div className="flex flex-col gap-4">
				{tasks.map((task) => {
					return <Task key={task.id} task={task} />;
				})}
				<AddColumnBtn
					className=" py-2 bg-teal-500 w-full rounded"
					setShow={setShow}
				>
					Add task
				</AddColumnBtn>
			</div>
		</div>
	);
};

export default Column;
