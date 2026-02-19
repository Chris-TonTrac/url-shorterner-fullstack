import jwt from 'jsonwebtoken';

const JWT_SECRETE_TOKEN = process.env.JWT_ACCESS_TOKEN_SECRETE;

export function createUserToken(payload) {

    if(!payload) {
        return { error: 'payload is empty.'}
    };

    const token = jwt.sign(payload, JWT_SECRETE_TOKEN);

    return token;
};

export function verifyUserToken(token) {

    if(!token) {
        return { error: 'Valid token is required.'}
    };

    try {
        const payload = jwt.verify(token, JWT_SECRETE_TOKEN);
        return payload;
    } catch (error) {
        return null;
    }
};