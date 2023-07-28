import { Button, Input, Typography } from 'antd';
import { emailRegexp } from 'helpers/regexp';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ILoginForm, ILoginFormValue } from './LoginForm.interface';
import styles from './LoginForm.module.scss';

const { Text } = Typography;

/**
 * Форма для логина
 */
const LoginForm: FC = () => {
	const { login } = useActions();
	const { onSubmit: loading } = useAppSelector(state => state.authReducer);
	const {
		control,
		clearErrors,
		formState: { errors },
		handleSubmit
	} = useForm<ILoginForm>();

	const onSubmit = (formData: ILoginForm) => {
		login(formData);
	};

	const errorMessage = (message: string) => {
		return <Text type='danger'>{message}</Text>;
	};

	// данные формы
	const loginFormValues: ILoginFormValue[] = [
		{
			name: 'email',
			rules: {
				required: {
					value: true,
					message: 'Введите email'
				},
				validate: {
					matchPattern: (v: string) =>
						emailRegexp.test(v) || 'Введите правильный email'
				}
			},
			label: 'Почта:',
			type: 'input',
			placeholder: 'sputnik@mail.ru'
		},
		{
			name: 'password',
			rules: {
				required: {
					value: true,
					message: 'Введите пароль'
				}
			},
			label: 'Пароль:',
			type: 'password',
			placeholder: '*******'
		}
	];

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
							{e.type == 'input' ? (
								<Input
									onChange={field.onChange}
									value={field.value}
									status={errors[e.name] && 'error'}
									size='large'
									placeholder={e.placeholder}
								/>
							) : (
								<Input.Password
									onChange={field.onChange}
									value={field.value}
									status={errors[e.name] && 'error'}
									size='large'
									placeholder={e.placeholder}
								/>
							)}

							{errors[e.name] && errorMessage(errors[e.name].message)}
						</div>
					)}
				/>
			))}
			<Button
				type='primary'
				htmlType='submit'
				onClick={() => clearErrors()}
				size='large'
				loading={loading}
				disabled={loading}
			>
				Отправить
			</Button>
		</form>
	);
};

export default LoginForm;
