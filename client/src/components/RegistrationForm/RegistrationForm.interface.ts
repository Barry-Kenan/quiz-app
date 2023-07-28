import { IFormValue } from 'interfaces/form.interface';
import { IUser } from 'interfaces/user.interface';

export interface IRegistrationForm extends Omit<IUser, 'id'> {
	confirm_password: string;
}

export interface IRegistrationFormValue extends IFormValue {
	name: keyof IRegistrationForm;
}
