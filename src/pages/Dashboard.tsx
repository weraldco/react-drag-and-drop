import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useEffect } from 'react';
import { useColumnStore } from '../../store/columnStore';
import { useTaskStore, type TaskT } from '../../store/taskStore';
import { API_PATHS } from '../../utils/apiPath';
import axiosInstance from '../../utils/axiosIntances';
import Column from '../components/Column';
import AddColumnForm from '../components/Column/AddColumnForm';
import CustomModal from '../components/custom-modal';

const Dashboard = () => {
	// Column Store
	const columns = useColumnStore((state) => state.columns);
	console.log('Component render - columns:', columns);
	const getColumns = useColumnStore((state) => state.getColumns);

	//Task Store
	const tasks = useTaskStore((state) => state.tasks);
	const getTasks = useTaskStore((state) => state.getTasks);

	useEffect(() => {
		getColumns();
	}, []);
	useEffect(() => {
		getTasks();
	}, []);

	const handleDragEnd = async (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over) return;
		const taskId = active.id as string;
		const newStatus = over.id as TaskT['column_id'];

		if (taskId && newStatus && taskId !== newStatus) {
			try {
				useTaskStore.getState().updateTaskColumn(taskId, newStatus);

				await axiosInstance.post(API_PATHS.TASKS.UPDATE, {
					id: taskId,
					column_id: newStatus,
				});
			} catch (error) {
				console.error(error);
			}
		}
	};

	if (!columns) return <div>Loading..</div>;
	if (!tasks) return <div>Loading..</div>;
	return (
		<div className="w-full h-full relative">
			<CustomModal headerTitle="Adding New Task" />

			<div className="p-4 flex w-full justify-between gap-4 relative">
				<div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 justify-between gap-8">
					<DndContext onDragEnd={handleDragEnd}>
						{columns.map((col) => {
							const columnTasks = tasks.filter(
								(task) => task.column_id === col.slug
							);
							return <Column key={col.slug} column={col} tasks={columnTasks} />;
						})}
						<div className=" rounded-xl ">
							<AddColumnForm />
						</div>
					</DndContext>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
