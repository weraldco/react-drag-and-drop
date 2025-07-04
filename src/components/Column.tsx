import { useDroppable } from '@dnd-kit/core';
import { memo } from 'react';
import type { ColumnsT } from '../../store/columnStore';
import { useModalStore } from '../../store/modalStore';
import type { TaskT } from '../../store/taskStore';
import Task from './Task';

interface Props {
	column: ColumnsT;
	tasks: TaskT[];
}

const Column = memo(({ column, tasks }: Props) => {
	console.log('Rendering Column:', column.slug, tasks.length);
	const openModal = useModalStore((s) => s.openModal);
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

				<button
					onClick={() => openModal(column.slug)}
					className="py-2 bg-teal-500 w-full rounded hover:bg-teal-400 duration-200 active:bg-teal-600 "
				>
					Add task
				</button>

				{/* <AddColumnBtn
					className=" py-2 bg-teal-500 w-full rounded hover:bg-teal-400 duration-200 active:bg-teal-600 "
					setShow={() => {
						setShow();
						setId(column.slug);
					}}
				>
					Add task
				</AddColumnBtn> */}
			</div>
		</div>
	);
}, areEqual);

function areEqual(prev: Props, next: Props) {
	return (
		prev.column.slug === next.column.slug &&
		prev.column.title === next.column.title &&
		prev.tasks.length === next.tasks.length &&
		prev.tasks.every((t, i) => t.id === next.tasks[i]?.id) &&
		prev.setShow === next.setShow &&
		prev.setId === next.setId
	);
}

export default Column;
