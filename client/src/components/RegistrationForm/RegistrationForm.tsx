import { Button, Input, Typography } from 'antd';
import { emailRegexp } from 'helpers/regexp';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IRegistrationForm } from './RegistrationForm.interface';
import styles from './RegistrationForm.module.scss';

const { Text } = Typography;
/**
 * Форма для регистрации
 */
const RegistrationForm: FC = () => {
	const { register } = useActions();
	const { onSubmit: loading } = useAppSelector(state => state.authReducer);

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

	const errorMessage = (message: string) => {
		return <Text type='danger'>{message}</Text>;
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
					},
					validate: {
						maxLength: v =>
							v.length <= 10 || 'Имя должно содержать меньше 10 символов'
					}
				}}
				render={({ field }) => (
					<div>
						<label>Имя:</label>
						<Input
							onChange={field.onChange}
							value={field.value}
							status={errors.name && 'error'}
							size='large'
							placeholder='John'
						/>
						{errors.name && errorMessage(errors.name.message)}
					</div>
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
					},
					validate: (val: string) =>
						val.length > 3 || 'Пароль должен содержать больше 3 символов'
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
			<Controller
				name='confirm_password'
				control={control}
				rules={{
					required: {
						value: true,
						message: 'Повторите пароль'
					},
					validate: (val: string) =>
						watch('password') == val || 'Пароли не совпадают'
				}}
				render={({ field }) => (
					<div>
						<label>Подтвердите пароль:</label>
						<Input.Password
							onChange={field.onChange}
							value={field.value}
							status={errors.confirm_password && 'error'}
							size='large'
							placeholder='*******'
						/>
						{errors.confirm_password &&
							errorMessage(errors.confirm_password.message)}
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

export default RegistrationForm;
