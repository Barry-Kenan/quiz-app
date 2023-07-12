import { Button, Input } from 'antd';
import { useActions } from 'hooks/action';
import { IUser } from 'interfaces/user.interface';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import styles from './RegistrationForm.module.scss';

const RegistrationForm: FC = () => {
	const { register } = useActions();
	const {
		control,
		reset,
		clearErrors,
		formState: { errors },
		handleSubmit
	} = useForm<Omit<IUser, 'id'>>();

	const onSubmit = (formData: Omit<IUser, 'id'>) => {
		register(formData);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<Controller
				name='name'
				control={control}
				rules={{
					required: {
						value: true,
						message: 'Введите имя'
					}
				}}
				render={({ field }) => (
					<>
						<Input
							onChange={field.onChange}
							value={field.value}
							status={errors.name && 'error'}
							size='large'
							placeholder='John'
						/>
						{errors.name && (
							<span className={styles.error}> {errors.name.message}</span>
						)}
					</>
				)}
			/>
			<Controller
				name='email'
				control={control}
				rules={{
					required: {
						value: true,
						message: 'Введите email'
					},
					validate: {
						maxLength: v =>
							v.length <= 50 || 'The email should have at most 50 characters',
						matchPattern: v =>
							/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
							'Email address must be a valid address'
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
			>
				Отправить
			</Button>
		</form>
	);
};

export default RegistrationForm;
