import { useForm, type FieldValues } from 'react-hook-form';
import { useColumnStore, type ColumnsT } from '../../../store/columnStore';
import ErrorMessage from '../ErrorMessage';

const AddColumnForm = () => {
	const addColumn = useColumnStore((s) => s.addColumn);

	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
		reset,
	} = useForm();

	const onSubmit = async (data: FieldValues) => {
		const newColumn: ColumnsT = {
			slug: data.columnName.toUpperCase(),
			title: data.columnName,
		};
		await addColumn(newColumn);
		reset();
		console.log('Adding column:', newColumn);
		console.log('Current columns:', useColumnStore.getState().columns);
	};
	return (
		<form
			className="flex flex-col p-4 space-y-4  relative"
			onSubmit={handleSubmit(onSubmit)}
		>
			<input
				{...register('columnName', {
					required: 'Task name is required!',
				})}
				type="text"
				className="text-neutral-900 text-sm w-full bg-white rounded-xl px-2 py-2 outline-none"
				placeholder="Add columns.."
			/>
			{errors.columnName && (
				<ErrorMessage error={`${errors.columnName.message}`} />
			)}

			<button
				disabled={isSubmitting}
				type="submit"
				className="text-neutral-50 text-sm  bg-blue-500 rounded-r-xl px-4 py-2 absolute right-0 cursor-pointer"
			>
				+
			</button>
		</form>
	);
};

export default AddColumnForm;
