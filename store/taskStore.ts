import { create } from 'zustand';

// type of store
export type TaskT = {
	id: number;
	title: string;
	description: string;
	column_id: string;
	status: boolean;
};
export type TaskStoreT = {
	tasks: TaskT[] | null;
	getTask: () => Promise<void | null>;
	addTask: () => Promise<void | null>;
};
// create a store

export const useTaskStore = create<TaskStoreT>((set, get) => ({
	tasks: null,
	getTask: async () => {
        const response = await 
    },
	addTask: async () => {},
}));
//// create a function of the store.
