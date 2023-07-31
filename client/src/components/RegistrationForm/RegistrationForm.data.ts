import { emailRegexp } from 'helpers/regexp';
import { FormInputTypeEnum } from 'interfaces/form.interface';
import { UseFormWatch } from 'react-hook-form';
import {
	IRegistrationForm,
	IRegistrationFormValue
} from './RegistrationForm.interface';

export const getRegistrationFormValues = (
	watch: UseFormWatch<IRegistrationForm>
): IRegistrationFormValue[] => {
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
					maxLength: (v: string) =>
						v.length <= 10 || 'Имя должно содержать меньше 10 символов'
				}
			},
			label: 'Имя:',
			type: FormInputTypeEnum.INPUT,
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
			type: FormInputTypeEnum.INPUT,
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
			type: FormInputTypeEnum.PASSWORD,
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
			type: FormInputTypeEnum.PASSWORD,
			placeholder: '*******'
		}
	];

	return registrationFormValues;
};
