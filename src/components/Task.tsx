import { useDraggable } from '@dnd-kit/core';
import type { TaskT } from '../utils/types';

interface Props {
	task: TaskT;
}

const Task = ({ task }: Props) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id: task.id,
	});

	const style = transform
		? { transform: `translate(${transform.x}px,${transform.y}px)` }
		: undefined;
	return (
		<div
			ref={setNodeRef}
			{...listeners}
			{...attributes}
			className="flex flex-col bg-neutral-600 gap-2 p-4 rounded-xl"
			style={style}
		>
			<div className=" text-white font-bold">{task.title}</div>
			<div className="text-sm text-neutral-300">{task.description}</div>
		</div>
	);
};

export default Task;
