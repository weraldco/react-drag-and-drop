import { create } from 'zustand';
import { API_PATHS } from '../utils/apiPath';
import axiosInstance from '../utils/axiosIntances';

export type TaskT = {
	id: number;
	title: string;
	description: string;
	column_id: string;
	status: boolean;
};
export type TaskStoreT = {
	tasks: TaskT[] | null;
	setTasks: (tasks: TaskT[]) => Promise<void | null>;
	getTasks: () => Promise<void | null>;
	addTask: (data: TaskT) => Promise<void | null>;
	updateTaskColumn: (taskId: string, newColumnId: string) => void;
};

export const useTaskStore = create<TaskStoreT>((set, get) => ({
	tasks: null,
	setTasks: async (tasks: TaskT[]) => {
		set({ tasks: tasks });
	},
	getTasks: async () => {
		const response = await axiosInstance.get(API_PATHS.TASKS.GET);
		if (response.data) {
			set({ tasks: response.data.data });
		}
	},
	addTask: async (data: TaskT) => {
		try {
			const response = await axiosInstance.post(API_PATHS.TASKS.ADD, data);
			set((state) => ({ tasks: [...(state.tasks ?? []), response.data.data] }));
		} catch (error) {
			console.error('Error adding new task', error);
		}
	},
	updateTaskColumn: (taskId: string, newColumnId: string) => {
		const tasksList = get().tasks;
		if (tasksList) {
			const updateTask = tasksList.map((t) =>
				String(t.id) === taskId ? { ...t, column_id: newColumnId } : t
			);
			set({ tasks: updateTask });
		}
	},
}));
