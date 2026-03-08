import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token
            req.user = await User.findByPk(decoded.id, {
                attributes: { exclude: ['password'] }
            });

            if (!req.user) {
                console.log('[AuthMiddleware] User not found in DB for token ID:', decoded.id);
                return res.status(401).json({ message: 'Not authorized, user missing' });
            }

            return next();
        } catch (error) {
            console.error('[AuthMiddleware] JWT Verification failed:', error.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        console.log('[AuthMiddleware] No token found in headers');
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Admin Middleware
export const admin = (req, res, next) => {
    if (req.user && (req.user.role?.toLowerCase() === 'admin')) {
        return next();
    } else {
        console.log('[AuthMiddleware] Access denied: User is not an admin. Role:', req.user?.role);
        return res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

// Teacher Middleware
export const teacher = (req, res, next) => {
    const role = req.user?.role?.toLowerCase();
    if (req.user && (role === 'teacher' || role === 'admin')) {
        return next();
    } else {
        console.log('[AuthMiddleware] Access denied: User is not a teacher or admin. Role:', role);
        return res.status(401).json({ message: 'Not authorized as a teacher' });
    }
};

// HOD/Admin Middleware (for corrections)
export const canCorrect = (req, res, next) => {
    const role = req.user?.role?.toLowerCase();
    if (req.user && (role === 'admin' || role === 'hod')) {
        return next();
    } else {
        console.log('[AuthMiddleware] Access denied: User cannot correct records. Role:', role);
        return res.status(401).json({ message: 'Not authorized to correct records' });
    }
};
