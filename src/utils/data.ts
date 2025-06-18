import type { ColumnT, TaskT } from './types';

export const COLUMNS: ColumnT[] = [
	{ id: 'TODO', title: 'To Do' },
	{ id: 'IN_PROGRESS', title: 'Inprogress' },
	{ id: 'DONE', title: 'Done' },
];

export const INITIAL_TASK: TaskT[] = [
	{
		id: '1',
		title: 'Research Project',
		description: 'Gather requirements and create initial documentation.',
		column_id: 'TODO',
		status: false,
	},
	{
		id: ' 2',
		title: 'Design Pattern',
		description: 'Gather requirements and create initial documentation.',
		column_id: 'IN_PROGRESS',
		status: false,
	},
	{
		id: '3',
		title: 'Design System',
		description: 'Gather requirements and create initial documentation.',
		column_id: 'IN_PROGRESS',
		status: false,
	},
	{
		id: '4',
		title: 'Algorithm',
		description: 'Gather requirements and create initial documentation.',
		column_id: 'DONE',
		status: false,
	},
];
