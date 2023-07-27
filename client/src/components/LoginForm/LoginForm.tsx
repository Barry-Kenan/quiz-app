import { Button, Input, Typography } from 'antd';
import { emailRegexp } from 'helpers/regexp';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ILoginForm } from './LoginForm.interface';
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

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<Controller
				name='email'
				control={control}
				rules={{
					required: {
						value: true,
						message: 'Введите email'
					},
					validate: {
						matchPattern: v => emailRegexp.test(v) || 'Введите правильный email'
					}
				}}
				render={({ field }) => (
					<div>
						<label>Почта:</label>
						<Input
							onChange={field.onChange}
							value={field.value}
							status={errors.email && 'error'}
							size='large'
							placeholder='sputnik@mail.ru'
						/>
						{errors.email && errorMessage(errors.email.message)}
					</div>
				)}
			/>
			<Controller
				name='password'
				control={control}
				rules={{
					required: {
						value: true,
						message: 'Введите пароль'
					}
				}}
				render={({ field }) => (
					<div>
						<label>Пароль:</label>
						<Input.Password
							onChange={field.onChange}
							value={field.value}
							status={errors.password && 'error'}
							size='large'
							placeholder='*******'
						/>
						{errors.password && errorMessage(errors.password.message)}
					</div>
				)}
			/>
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
