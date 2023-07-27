import { IUser } from 'interfaces/user.interface';

export interface IRegistrationForm extends Omit<IUser, 'id'> {
	confirm_password: string;
}
