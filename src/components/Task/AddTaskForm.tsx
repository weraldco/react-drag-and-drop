import FormInputField from '../FormInputField';

interface Props {
	props?: string;
}

const AddTaskForm = ({ props }: Props) => {
	return (
		<form className="flex flex-col p-4 space-y-4">
			<FormInputField label="Task Name" placeholder="Enter your task name.." />
			<FormInputField
				label="Task Description"
				placeholder="Enter your task description.."
			/>
			<button
				type="submit"
				className="bg-blue-500 p-2 rounded-xl text-white cursor-pointer"
			>
				Add Task
			</button>
		</form>
	);
};

export default AddTaskForm;
