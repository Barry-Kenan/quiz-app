import { IFormValue } from 'interfaces/form.interface';
import { IUser } from 'interfaces/user.interface';

export interface ILoginForm extends Omit<IUser, 'id' | 'name'> {}

export interface ILoginFormValue extends IFormValue {
	name: keyof ILoginForm;
}
