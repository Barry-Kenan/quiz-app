import { Button, Input } from 'antd';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import { IUser } from 'interfaces/user.interface';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styles from './LoginForm.module.scss';

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
	} = useForm<Omit<IUser, 'id' | 'name'>>();

	const onSubmit = (formData: Omit<IUser, 'id' | 'name'>) => {
		login(formData);
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
						matchPattern: v =>
							/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
							'Введите правильный email'
					}
				}}
				render={({ field }) => (
					<>
						<Input
							onChange={field.onChange}
							value={field.value}
							status={errors.email && 'error'}
							size='large'
							placeholder='sputnik@mail.ru'
						/>
						{errors.email && (
							<span className={styles.error}> {errors.email.message}</span>
						)}
					</>
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
					<>
						<Input.Password
							onChange={field.onChange}
							value={field.value}
							status={errors.password && 'error'}
							size='large'
							placeholder='*******'
						/>
						{errors.password && (
							<span className={styles.error}> {errors.password.message}</span>
						)}
					</>
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
