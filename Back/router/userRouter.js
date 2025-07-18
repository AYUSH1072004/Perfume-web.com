import express from 'express';
import UserController from '../controllers/userController.js'

const router = express.Router();

router.route('/home').get(UserController.home);
router.route('/signup').post(UserController.signup);
router.route('/signin').post(UserController.signin);

export default router;