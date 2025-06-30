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
	addTask: () => Promise<void | null>;
};

export const useTaskStore = create<TaskStoreT>((set) => ({
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
	addTask: async () => {},
}));
