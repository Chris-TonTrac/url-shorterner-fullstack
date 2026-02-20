import { verifyUserToken } from "../utils/token.js";

/**
 * 
 * @param {import("express").Request} req 
 * @param {import("express").Response} res 
 * @param {import("express").NextFunction} next 
 */
export function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];

    if(!authHeader || !authHeader.startsWith('Bearer')) {
        return res.status(401).json({ error: 'You must be logged in to access this resource.' });
    };

    const token = authHeader.split(' ')[1];

    if(!token) {
        return res.status(401).json({ error: 'You must be logged in to access this resource.' });
    };

    const payload = verifyUserToken(token);

    if(!payload) {
        return res.status(401).json({ error: 'Invalid or expired token.' });
    }

    req.user = payload;
    next();
};
