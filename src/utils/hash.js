import { createHmac, randomBytes } from 'crypto';

// Hash a password using HMAC-SHA256.
// If no salt is provided we generate a fresh random one — this happens at sign-up.
// At login we pass in the stored salt so we can reproduce the same hash for comparison.
export function hashPassword(password, userSalt = undefined) {

    const salt = userSalt ?? randomBytes(256).toString('hex');
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');

    return { salt, password: hashedPassword };
};