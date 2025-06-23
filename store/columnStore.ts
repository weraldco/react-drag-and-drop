import { create } from 'zustand';
import { API_PATHS } from '../utils/apiPath';
import axiosInstance from '../utils/axiosIntances';

export type ColumnsT = {
	title: string;
	slug: string;
};
// declared the type
type ColumnStoreT = {
	columns: ColumnsT[] | null;
	setColumns: (columns: ColumnsT[]) => Promise<null | void>;
	getColumns: () => Promise<null | void>;
	addColumn: () => Promise<null | void>;
};
// create a hook store

export const useColumnStore = create<ColumnStoreT>((set, get) => ({
	columns: null,
	setColumns: async (columns: ColumnsT[]) => {
		if (columns) {
			set({ columns: columns });
		}
	},
	getColumns: async () => {
		const response = await axiosInstance.get(API_PATHS.COLUMNS.GET);
		if (response.data) {
			set({ columns: response.data.data });
		}
	},
	addColumn: async () => {},
}));
