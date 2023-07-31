import { emailRegexp } from 'helpers/regexp';
import { FormInputTypeEnum } from 'interfaces/form.interface';
import { ILoginFormValue } from './LoginForm.interface';

export const getLoginFormValues = (): ILoginFormValue[] => {
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
			type: FormInputTypeEnum.INPUT,
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
			type: FormInputTypeEnum.PASSWORD,
			placeholder: '*******'
		}
	];

	return loginFormValues;
};
