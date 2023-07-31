export enum FormInputTypeEnum {
	INPUT = 'input',
	PASSWORD = 'password'
}
export interface IFormValue {
	rules: IRules;
	label: string;
	type: FormInputTypeEnum;
	placeholder: string;
}

interface IRules {
	required?: {
		value: boolean;
		message: string;
	};
	validate?: {
		[key: string]: (v: string) => string | boolean;
	};
}
