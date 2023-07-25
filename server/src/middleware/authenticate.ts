import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { JwtPayload } from '../interfaces/jwt';
import { db } from '../server';

const handleError = (res: Response, status: number, error: string) => {
	res.status(status).send({ message: error });
};

export const authenticate = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const accessToken = req.cookies['accessToken'];

		const payload: JwtPayload = verify(
			accessToken,
			'access_secret'
		) as JwtPayload;

		if (!payload) {
			return handleError(res, 401, 'Unauthenticated');
		}

		const userRef = db.collection('users').doc(payload.id);
		const response = await userRef.get();
		const user = response.data();

		if (!user) {
			return handleError(res, 401, 'Unauthenticated');
		}

		next();
	} catch (e) {
		return handleError(res, 401, 'Unauthenticated');
	}
};
