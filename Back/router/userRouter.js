import express from 'express';
import UserController from '../controllers/userController.js';
import authMiddleware from '../Middlewares/userMiddleware.js';

const router = express.Router();

// ✅ Public Routes
router.route('/home').get(UserController.home);
router.route('/signup').post(UserController.signup);
router.route('/signin').post(UserController.signin);

// ✅ Protected Route
router.route('/profile').get(authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;
