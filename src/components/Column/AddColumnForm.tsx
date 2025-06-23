import { useForm, type FieldValues } from 'react-hook-form';
import type { ColumnsT } from '../../../store/columnStore';
import ErrorMessage from '../ErrorMessage';
import FormInputField from '../FormInputField';

interface Props {
	setCloseModal: () => void;
	handleAddColumn: (data: ColumnsT) => void;
}

const AddColumnForm = ({ setCloseModal, handleAddColumn }: Props) => {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		reset,
	} = useForm();

	const onSubmit = async (data: FieldValues) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const newColumn: ColumnsT = {
			slug: data.columnName.toUpperCase(),
			title: data.columnName,
		};
		handleAddColumn(newColumn);
		reset();
		setCloseModal();
	};
	return (
		<form
			className="flex flex-col p-4 space-y-4"
			onSubmit={handleSubmit(onSubmit)}
		>
			<FormInputField
				{...register('columnName', {
					required: 'Task name is required!',
				})}
				label="Column Name"
				type="text"
				id="task-name"
				placeholder="Enter your task name.."
			/>
			{errors.columnName && (
				<ErrorMessage error={`${errors.columnName.message}`} />
			)}

			<button
				disabled={isSubmitting}
				type="submit"
				className="bg-blue-500 p-2 rounded-xl text-white cursor-pointer"
			>
				Add Column
			</button>
		</form>
	);
};

export default AddColumnForm;
