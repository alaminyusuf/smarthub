export const InputField = ({ type, name, label }) => {
	return (
		<div className='col-span-6 sm:col-span-3'>
			<label htmlFor={name} className='block text-sm font-medium text-gray-700'>
				{label}
			</label>
			<input
				type={type}
				name={name}
				id={name}
				autoComplete='given-name'
				className='mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
			/>
		</div>
	);
};
