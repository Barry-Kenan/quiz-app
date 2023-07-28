export interface IFormValue {
	rules: IRules;
	label: string;
	type: 'input' | 'password';
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
