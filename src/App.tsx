import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import AddColumnBtn from './components/AddColumnBtn';
import Column from './components/Column';
import Modal from './components/Modal';
import AddTaskForm from './components/Task/AddTaskForm';
import { COLUMNS, INITIAL_TASK } from './utils/data';
import type { TaskT } from './utils/types';

function App() {
	const [tasks, setTasks] = useState<TaskT[]>(INITIAL_TASK);
	const [showAddColumnModal, setShowAddColumnModal] = useState(false);
	const [showAddTaskModal, setShowAddTaskModal] = useState(false);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) return;
		const taskId = active.id as string;
		const newStatus = over.id as TaskT['column_id'];

		setTasks(() =>
			tasks.map((task) =>
				task.id === taskId ? { ...task, column_id: newStatus } : task
			)
		);
	};
	return (
		<div className="w-full h-full relative">
			{showAddColumnModal && (
				<Modal
					headerTitle="Adding New Column"
					handleModalShow={() => setShowAddColumnModal((prev) => !prev)}
				>
					<div></div>
				</Modal>
			)}
			{showAddTaskModal && (
				<Modal
					headerTitle="Adding New Task"
					handleModalShow={() => setShowAddTaskModal((prev) => !prev)}
				>
					<AddTaskForm />
				</Modal>
			)}

			<div className="p-4 flex w-full justify-between gap-4 relative">
				<div className="flex gap-8">
					<DndContext onDragEnd={handleDragEnd}>
						{COLUMNS.map((col, i) => {
							return (
								<Column
									key={i}
									column={col}
									tasks={tasks.filter((task) => task.column_id === col.id)}
									setShow={() => setShowAddTaskModal((prev) => !prev)}
								/>
							);
						})}
						<AddColumnBtn
							className="bg-blue-500 rounded-full gap-4 font-bold text-sm w-[50px] cursor-pointer h-full flex items-center justify-center"
							setShow={() => setShowAddColumnModal((prev) => !prev)}
						>
							<IoIosAdd size={30} />
						</AddColumnBtn>
						{/* <div className=" bg-blue-500 rounded-xl flex flex-col w-full p-4 gap-4 font-bold text-sm">
						<input
            type="text"
            placeholder="Enter Column name.."
            className="bg-white rounded-xl text-black p-2 font-medium"
						/>
						<button className="bg-blue-300 p-2 rounded-xl cursor-pointer">
            Add
						</button>
            </div> */}
					</DndContext>
				</div>
			</div>
		</div>
	);
}

export default App;
