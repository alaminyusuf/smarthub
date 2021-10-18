import {
	FreelancerInputOptions,
	ClientInputOptions,
	JobInputOptions,
} from "./inputOptions";

export const validateFreelancerInputFields = (
	options: FreelancerInputOptions
) => {
	if (options.firstName.length <= 2) {
		return {
			field: "first name",
			message: "first name must be greater than 2",
		};
	}
	if (options.lastName.length <= 2) {
		return {
			field: "last name",
			message: "last name must be greater than 2",
		};
	}
	if (options.email.length <= 5 || !options.email.includes("@")) {
		return {
			field: "email",
			message: "invalid email",
		};
	}
	if (options.password.length <= 5) {
		return {
			field: "password",
			message: "password must at least be 6",
		};
	}
	if (options.jobTitle.length <= 2) {
		return {
			field: "job title",
			message: "invalid job title",
		};
	}
	return null;
};
export const validateClientInputFields = (options: ClientInputOptions) => {
	if (options.firstName.length <= 2) {
		return {
			field: "first name",
			message: "first name must be greater than 2",
		};
	}
	if (options.lastName.length <= 2) {
		return {
			field: "last name",
			message: "last name must be greater than 2",
		};
	}
	if (options.email.length <= 5 || !options.email.includes("@")) {
		return {
			field: "email",
			message: "invalid email",
		};
	}
	if (options.password.length <= 5) {
		return {
			field: "password",
			message: "password must at least be 6",
		};
	}
	return null;
};
export const validateJobInputFields = (options: JobInputOptions) => {
	if (options.title.length <= 15) {
		return {
			field: "title",
			message: "invalid titile",
		};
	}
	if (options.desc.length <= 25) {
		return {
			field: "description",
			message: "invalid description",
		};
	}
	if (options.price <= 5) {
		return {
			field: "price",
			message: "invalid price",
		};
	}
	return null;
};
