import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config.js'

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            message: 'No token provided'
        })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid token'
        })
    }
}