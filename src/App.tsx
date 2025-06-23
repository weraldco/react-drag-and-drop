// import { useEffect } from 'react';
// import { useColumnStore } from '../store/columnStore';

// const App = () => {
// 	const { columns, getColumns } = useColumnStore();
// 	useEffect(() => {
// 		getColumns();
// 	}, []);
// 	console.log('Data', columns);
// 	return <div>Test</div>;
// };

// export default App;

import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { useColumnStore, type ColumnsT } from '../store/columnStore';
import { API_PATHS } from '../utils/apiPath';
import axiosInstance from '../utils/axiosIntances';
import AddColumnBtn from './components/AddColumnBtn';
import Column from './components/Column';
import AddColumnForm from './components/Column/AddColumnForm';
import Modal from './components/Modal';
import AddTaskForm from './components/Task/AddTaskForm';
import { INITIAL_TASK } from './utils/data';
import type { TaskT } from './utils/types';

function App() {
	const { columns, getColumns } = useColumnStore();
	const [tasks, setTasks] = useState<TaskT[]>(INITIAL_TASK);
	useEffect(() => {
		getColumns();
	}, [getColumns]);

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
	const handleAddColumn = async (data: ColumnsT) => {
		try {
			await axiosInstance.post(API_PATHS.COLUMNS.ADD, data);
			getColumns();
		} catch (error) {
			console.error('Error adding new column!', error);
		}
		// setColumns([...columns, data]);
	};
	if (!columns) return <div>Loading..</div>;
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
				<div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 justify-between gap-8">
					<DndContext onDragEnd={handleDragEnd}>
						{columns.map((col, i) => {
							return (
								<Column
									key={i}
									column={col}
									tasks={tasks.filter((task) => task.column_id === col.slug)}
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
