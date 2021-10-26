import React from "react";
import { CountryDropdown } from "react-country-region-selector";
import { InputField } from "../components/InputField";

export default function SignUp() {
	const [country, setCountry] = React.useState("");
	const handleChange = (val) => setCountry(val);
	return (
		<>
			<form className='lg:container' action='#' method='POST'>
				<div>
					<div className='md:grid md:grid-cols-3 md:gap-6'>
						<div className='md:col-span-1'>
							<div className='px-4 sm:px-0'>
								<h3 className='text-lg font-medium leading-6 text-gray-900'>
									Profile
								</h3>
								<p className='mt-1 text-sm text-gray-600'>
									This information will be displayed publicly so be careful what
									you share.
								</p>
							</div>
						</div>
						<div className='mt-5 md:mt-0 md:col-span-2'>
							<div className='shadow sm:rounded-md sm:overflow-hidden'>
								<div className='px-4 py-5 bg-white space-y-6 sm:p-6'>
									<InputField
										type={"text"}
										label={"Job Title"}
										name={"job-title"}
									/>

									<div>
										<label
											htmlFor='about'
											className='block text-sm font-medium text-gray-700'
										>
											About
										</label>
										<div className='mt-1'>
											<textarea
												id='about'
												name='about'
												rows={3}
												className='shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md'
												placeholder='I am ....'
												defaultValue={""}
											/>
										</div>
										<p className='mt-2 text-sm text-gray-500'>
											Brief description for your profile. URLs are hyperlinked.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='hidden sm:block' aria-hidden='true'>
					<div className='py-5'>
						<div className='border-t border-gray-200' />
					</div>
				</div>

				<div className='mt-10 sm:mt-0'>
					<div className='md:grid md:grid-cols-3 md:gap-6'>
						<div className='md:col-span-1'>
							<div className='px-4 sm:px-0'>
								<h3 className='text-lg font-medium leading-6 text-gray-900'>
									Personal Information
								</h3>
								<p className='mt-1 text-sm text-gray-600'>
									Use a permanent address where you can receive mail.
								</p>
							</div>
						</div>
						<div className='mt-5 md:mt-0 md:col-span-2'>
							<div className='shadow overflow-hidden sm:rounded-md'>
								<div className='px-4 py-5 bg-white sm:p-6'>
									<div className='grid grid-cols-6 gap-6'>
										<InputField
											type={"text"}
											name={"first_name"}
											label={"First Name"}
										/>
										<InputField
											type={"text"}
											label={"Last Name"}
											name={"last_name"}
										/>

										<InputField type={"text"} label={"Email"} name={"email"} />

										<div className='col-span-6 sm:col-span-3'>
											<label
												htmlFor='country'
												className='block text-sm font-medium text-gray-700'
											>
												Country
											</label>
											<CountryDropdown
												onChange={(country) => handleChange(country)}
												value={country}
											/>
										</div>

										<InputField
											type={"number"}
											name={"phone"}
											label={"Phone"}
										/>
									</div>
								</div>
								<div className='px-4 py-3 bg-gray-50 text-right sm:px-6'>
									<button
										type='submit'
										className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
									>
										Save
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='hidden sm:block' aria-hidden='true'>
					<div className='py-5'>
						<div className='border-t border-gray-200' />
					</div>
				</div>
			</form>
		</>
	);
}
