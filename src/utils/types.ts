export type ColumnT = {
	id: string;
	title: string;
};

export type TaskT = {
	id: string;
	title: string;
	description: string;
	column_id: string;
	status: boolean;
};
