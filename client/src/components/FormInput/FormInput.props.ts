import { FormInputTypeEnum } from 'interfaces/form.interface';
import { ChangeEvent } from 'react';

export interface FormInputProps {
	onChange: (event: string | ChangeEvent<Element>) => void;
	value: string;
	isError: boolean;
	placeholder: string;
	type: FormInputTypeEnum;
}
