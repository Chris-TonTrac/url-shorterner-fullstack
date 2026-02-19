import express from 'express';
import db from '../db/index.js';
import { usersTable } from '../model/user.model.js';
import { validateSignUp, loginValidation } from '../validation/user.validation.js';
import { getUser, createUser } from '../service/user.service.js';
import { createUserToken } from '../utils/token.js';
import { hashPassword } from '../utils/hash.js';

const router = express.Router();

// --- Sign Up ---
// Validate the fields, hash the password, then create the user.
router.post('/sign-up', async(req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const error = validateSignUp(firstName, lastName, email, password);

    // Return early if anything looks wrong — no point going further
    if(error) {
        return res.status(400).json(error);
    };

    const { salt, password: hashedPassword } = hashPassword(password);

    try {
        const user = await createUser(firstName, lastName, email, hashedPassword, salt);

        // 201 = Created, send back the new user's id so the client knows it worked
        return res.status(201).json({ success: user.id});
    } catch (error) {
        const pgCode = error?.cause?.code ?? error?.code;
        const constraint = error?.cause?.constraint ?? error?.constraint;

        if (pgCode === '23505' && constraint === 'users_email_unique') {
            return res.status(409).json({ error: 'Email already exists.' });
        }

        return res.status(500).json({ error: 'Failed to create user.' });
    }
});

// --- Login ---
// Look up the user by email, re-hash the provided password using the stored
// salt, and compare it to what we have in the db. If it matches, hand back a JWT.
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const error = loginValidation(email, password);

    if(error) {
        return res.status(400).json(error);
    };

    const user = await getUser(email);

    // No account found for this email
    if(!user) {
        return res.status(400).json({ error: 'Invalid email.'});
    };

    // Re-create the hash using the same salt that was used when the password was first set
    const salt = user.salt;
    const { password: newHashedPassword } = hashPassword(password, salt);

    // Hashes don't match → wrong password
    if(user.password !== newHashedPassword) {
        return res.status(400).json({ error: 'Invalid password' });
    };

    // Everything checks out — sign a token and send it back
    const token = createUserToken({ id: user.id });

    return res.json({ token })
});

export default router;