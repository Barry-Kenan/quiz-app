import { AuthPage, HomePage } from 'pages';
import { ComponentType } from 'react';

export interface IRoute {
	path: string;
	element: ComponentType;
}

export enum RoutesNames {
	AUTH = '/auth',
	HOME = '/',
	NOTFOUND = '*'
}

export const authRoutes: IRoute[] = [
	{
		path: RoutesNames.AUTH,
		element: AuthPage
	}
];

export const privateRoutes: IRoute[] = [
	{
		path: RoutesNames.HOME,
		element: HomePage
	}
];
