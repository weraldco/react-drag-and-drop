import { useForm, type FieldValues } from 'react-hook-form';
import type { TaskT } from '../../../store/taskStore';
import ErrorMessage from '../ErrorMessage';
import FormInputField from '../FormInputField';

interface Props {
	id: string;
	handleAddTask: (data: TaskT) => void;
	setCloseModal: () => void;
}

const AddTaskForm = ({ handleAddTask, setCloseModal, id }: Props) => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		reset,
	} = useForm();

	const onSubmit = async (data: FieldValues) => {
		const newData: TaskT = {
			id: 0,
			title: data.taskName,
			description: data.taskDescription,
			status: false,
			column_id: id,
		};

		handleAddTask(newData);
		reset();
		setCloseModal();
	};
	return (
		<form
			className="flex flex-col p-4 space-y-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			<FormInputField
				{...register('taskName', {
					required: 'Task name is required!',
				})}
				label="Task Name"
				type="text"
				id="task-name"
				placeholder="Enter your task name.."
			/>
			{errors.taskName && <ErrorMessage error={`${errors.taskName.message}`} />}
			<FormInputField
				{...register('taskDescription', {
					required: 'Task description is required!',
				})}
				label="Task Description"
				type="text"
				id="task-description"
				placeholder="Enter your task description.."
			/>
			{errors.taskDescription && (
				<ErrorMessage error={`${errors.taskDescription.message}`} />
			)}

			<button
				disabled={isSubmitting}
				type="submit"
				className="bg-blue-500 p-2 rounded-xl text-white cursor-pointer"
			>
				Add Task
			</button>
		</form>
	);
};

export default AddTaskForm;
