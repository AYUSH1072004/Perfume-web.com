// middlewares/auth-middleware.js
import jwt from 'jsonwebtoken';
import User from '../schema/userSchema.js';

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token;

    if (!token) {
      return res.status(401).json({ message: 'No token, please login' });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // Attach user to request
    next();
  } catch (error) {
    console.error('JWT Error:', error);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware;
