import { IUser } from 'interfaces/user.interface';

export interface ILoginForm extends Omit<IUser, 'id' | 'name'> {}
