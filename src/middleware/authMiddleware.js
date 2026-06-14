import jwt from 'jsonwebtoken';
import { prisma } from '../config/db.js';

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 'error',
            message: 'No token, authorization denied'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = await prisma.user.findUnique({
            where: { id: decoded.id }
        });

        if (!req.user) {
            return res.status(401).json({
                status: 'error',
                message: 'User not found, authorization denied'
            });
        }

        next();
    } catch (err) {
        return res.status(401).json({
            status: 'error',
            message: 'Token is not valid'
        });
    }
};

export default authMiddleware;
