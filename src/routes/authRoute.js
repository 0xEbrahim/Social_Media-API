import { Router } from 'express';
const router = Router();
import {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  verifyEmail,
  changePassword,
} from '../controllers/authController.js';

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', logoutUser);

router.post('/forgot-password', forgotPassword);

router.put('/change-password', changePassword);

router.put('/reset-password/:token', resetPassword);

router.put('/verify-email/:token', verifyEmail);

export default router;
