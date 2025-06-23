import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import AddColumnBtn from './components/AddColumnBtn';
import Column from './components/Column';
import AddColumnForm from './components/Column/AddColumnForm';
import Modal from './components/Modal';
import AddTaskForm from './components/Task/AddTaskForm';
import { INITIAL_COLUMN, INITIAL_TASK } from './utils/data';
import type { ColumnT, TaskT } from './utils/types';

function App() {
	const [tasks, setTasks] = useState<TaskT[]>(INITIAL_TASK);
	const [columns, setColumns] = useState<ColumnT[]>(INITIAL_COLUMN);

	const [id, setId] = useState<string>('');
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

	const handleAddTask = (data: TaskT) => {
		setTasks([...tasks, data]);
	};
	const handleAddColumn = (data: ColumnT) => {
		setColumns([...columns, data]);
	};
	return (
		<div className="w-full h-full relative">
			{showAddColumnModal && (
				<Modal
					headerTitle="Adding New Column"
					handleModalShow={() => setShowAddColumnModal((prev) => !prev)}
				>
					<AddColumnForm
						handleAddColumn={handleAddColumn}
						setCloseModal={() => setShowAddColumnModal(false)}
					/>
				</Modal>
			)}
			{showAddTaskModal && (
				<Modal
					headerTitle="Adding New Task"
					handleModalShow={() => setShowAddTaskModal((prev) => !prev)}
				>
					<AddTaskForm
						tasks={tasks}
						setTasks={handleAddTask}
						id={id}
						setCloseModal={() => setShowAddTaskModal(false)}
					/>
				</Modal>
			)}

			<div className="p-4 flex w-full justify-between gap-4 relative">
				<div className="grid grid-cols-6 justify-between gap-8">
					<DndContext onDragEnd={handleDragEnd}>
						{columns.map((col, i) => {
							return (
								<Column
									key={i}
									column={col}
									tasks={tasks.filter((task) => task.column_id === col.id)}
									setTasks={setTasks}
									setShow={() => setShowAddTaskModal((prev) => !prev)}
									setId={setId}
								/>
							);
						})}
						<AddColumnBtn
							className="bg-blue-500 rounded-full gap-4 font-bold text-sm w-[50px] cursor-pointer min-h-[300px] h-full flex items-center justify-center"
							setShow={() => setShowAddColumnModal((prev) => !prev)}
						>
							<IoIosAdd size={30} />
						</AddColumnBtn>
					</DndContext>
				</div>
			</div>
		</div>
	);
}

export default App;
