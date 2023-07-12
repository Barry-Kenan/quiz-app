import express from 'express';
import {
	authenticatedUser,
	login,
	logout,
	refresh,
	register,
} from '../controllers/auth-controller';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', logout);
router.get('/user', authenticatedUser);

export default router;
