import { Typography } from 'antd';
import { FC } from 'react';
import { FormErrorMessageProps } from './FormErrorMessage.props';

const { Text } = Typography;

const FormErrorMessage: FC<FormErrorMessageProps> = ({ message }) => {
	return <Text type='danger'>{message}</Text>;
};

export default FormErrorMessage;
