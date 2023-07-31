import FormButton from 'components/FormButton/FormButton';
import FormErrorMessage from 'components/FormErrorMessage/FormErrorMessage';
import FormInput from 'components/FormInput/FormInput';
import { useActions } from 'hooks/action';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { getLoginFormValues } from './LoginForm.data';
import { ILoginForm } from './LoginForm.interface';
import styles from './LoginForm.module.scss';

/**
 * Форма для логина
 */
const LoginForm: FC = () => {
	const { login } = useActions();
	const {
		control,
		clearErrors,
		formState: { errors },
		handleSubmit
	} = useForm<ILoginForm>();

	const onSubmit = (formData: ILoginForm) => {
		login(formData);
	};

	const clearFormErrors = () => {
		clearErrors();
	};

	// данные формы
	const loginFormValues = getLoginFormValues();

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			{loginFormValues.map(e => (
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
							{errors[e.name] && (
								<FormErrorMessage message={errors[e.name].message} />
							)}
						</div>
					)}
				/>
			))}
			<FormButton clearFormErrors={clearFormErrors} />
		</form>
	);
};

export default LoginForm;
