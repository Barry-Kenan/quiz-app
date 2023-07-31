import { Button } from 'antd';
import { useAppSelector } from 'hooks/redux';
import { FC } from 'react';
import { FormButtonProps } from './FormButton.props';

const FormButton: FC<FormButtonProps> = ({ clearFormErrors }) => {
	const { onSubmit } = useAppSelector(state => state.authReducer);

	return (
		<Button
			type='primary'
			htmlType='submit'
			onClick={clearFormErrors}
			size='large'
			loading={onSubmit}
			disabled={onSubmit}
		>
			Отправить
		</Button>
	);
};

export default FormButton;
