import express from 'express';
import { getUser, createUser } from '../service/user.service.js';
import { createUserToken } from '../utils/token.js';
import { hashPassword } from '../utils/hash.js';
import { signUpValidation, loginValidation } from '../validation/request.validation.js';

const router = express.Router();

// --- Sign Up ---
// Validate the fields, hash the password, then create the user.
router.post('/sign-up', async(req, res) => {
    const validationResult = await signUpValidation.safeParseAsync(req.body);

    if(validationResult.error) {
        return res.status(400).json({ error: validationResult.error.format()});
    };

    const { firstName, lastName, email, password } = validationResult.data;

    const existingUser = await getUser(email);

    if(existingUser.length > 0){
        return res.status(400).json({ error: 'User with this email already exists.'});
    };

    const { salt, password: hashedPassword } = hashPassword(password);

    const user = await createUser(firstName, lastName, email, hashedPassword, salt);

    return res.status(201).json({ data: { userId: user.id }});
});

// --- Login ---
// Look up the user by email, re-hash the provided password using the stored
// salt, and compare it to what we have in the db. If it matches, hand back a JWT.
router.post('/login', async (req, res) => {
    const validationResult = await loginValidation.safeParseAsync(req.body);

    if(validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
    };

    const { email, password } = validationResult.data;

    const users = await getUser(email);

    // No account found for this email
    if(users.length === 0) {
    return res.status(404).json({ error: 'user with this email does not exist.'})
    };

    const user = users[0];

    // Re-create the hash using the same salt that was used when the password was first set
    const { password: newHashedPassword } = hashPassword(password, user.salt);

    // Hashes don't match → wrong password
    if(user.password !== newHashedPassword) {
        return res.status(400).json({ error: 'Invalid password' });
    };

    // Everything checks out — sign a token and send it back
    const token = createUserToken({ id: user.id });

    return res.json({ token })
});

export default router;