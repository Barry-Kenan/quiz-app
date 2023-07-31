import { Input } from 'antd';
import { FormInputTypeEnum } from 'interfaces/form.interface';
import { FC } from 'react';
import { FormInputProps } from './FormInput.props';

const FormInput: FC<FormInputProps> = ({
	onChange,
	value,
	isError,
	placeholder,
	type
}) => {
	switch (type) {
		case FormInputTypeEnum.INPUT:
			return (
				<Input
					onChange={onChange}
					value={value}
					status={isError && 'error'}
					size='large'
					placeholder={placeholder}
				/>
			);
		case FormInputTypeEnum.PASSWORD:
			return (
				<Input.Password
					onChange={onChange}
					value={value}
					status={isError && 'error'}
					size='large'
					placeholder={placeholder}
				/>
			);
		default:
			const a: never = type;
	}
};

export default FormInput;
