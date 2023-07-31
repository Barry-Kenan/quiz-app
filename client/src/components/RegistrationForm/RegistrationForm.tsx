import { Typography } from 'antd';
import FormButton from 'components/FormButton/FormButton';
import FormInput from 'components/FormInput/FormInput';
import { useActions } from 'hooks/action';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { getRegistrationFormValues } from './RegistrationForm.data';
import { IRegistrationForm } from './RegistrationForm.interface';
import styles from './RegistrationForm.module.scss';

const { Text } = Typography;
/**
 * Форма для регистрации
 */
const RegistrationForm: FC = () => {
	const { register } = useActions();

	const {
		control,
		watch,
		clearErrors,
		formState: { errors },
		handleSubmit
	} = useForm<IRegistrationForm>();

	const onSubmit = (formData: IRegistrationForm) => {
		const { confirm_password, ...data } = formData;
		register(data);
	};

	const clearFormErrors = () => {
		clearErrors();
	};

	const errorMessage = (message: string) => {
		return <Text type='danger'>{message}</Text>;
	};

	// данные формы
	const registrationFormValues = getRegistrationFormValues(watch);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			{registrationFormValues.map(e => (
				<Controller
					key={e.name}
					name={e.name}
					control={control}
					rules={{
						...e.rules
					}}
					render={({ field }) => (
						<div>
							<label>{e.label}</label>
							<FormInput
								onChange={field.onChange}
								value={field.value}
								placeholder={e.placeholder}
								isError={!!errors[e.name]}
								type={e.type}
							/>
							{errors[e.name] && errorMessage(errors[e.name].message)}
						</div>
					)}
				/>
			))}
			<FormButton clearFormErrors={clearFormErrors} />
		</form>
	);
};

export default RegistrationForm;
