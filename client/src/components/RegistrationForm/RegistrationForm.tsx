import { Button, Input, Typography } from 'antd';
import { emailRegexp } from 'helpers/regexp';
import { useActions } from 'hooks/action';
import { useAppSelector } from 'hooks/redux';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
	IRegistrationForm,
	IRegistrationFormValue
} from './RegistrationForm.interface';
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

	// данные формы
	const registrationFormValues: IRegistrationFormValue[] = [
		{
			name: 'name',
			rules: {
				required: {
					value: true,
					message: 'Введите имя'
				},
				validate: {
					maxLength: v =>
						v.length <= 10 || 'Имя должно содержать меньше 10 символов'
				}
			},
			label: 'Имя:',
			type: 'input',
			placeholder: 'John'
		},
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
				},
				validate: {
					minLength: (val: string) =>
						val.length > 3 || 'Пароль должен содержать больше 3 символов'
				}
			},
			label: 'Пароль:',
			type: 'password',
			placeholder: '*******'
		},
		{
			name: 'confirm_password',
			rules: {
				required: {
					value: true,
					message: 'Повторите пароль'
				},
				validate: {
					matchPassword: (val: string) =>
						watch('password') == val || 'Пароли не совпадают'
				}
			},
			label: 'Подтвердите пароль:',
			type: 'password',
			placeholder: '*******'
		}
	];

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

export default RegistrationForm;
