import express from 'express';
import db from '../db/index.js';
import { usersTable } from '../model/user.model.js';
import { validateSignUp, loginValidation } from '../validation/user.validation.js';
import { createHmac, randomBytes } from 'crypto';
import { getUser } from '../service/user.service.js';

const router = express.Router();

router.post('/sign-up', async(req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const error = validateSignUp(firstName, lastName, email, password);

    if(error) {
        return res.status(400).json(error);
    };

    const salt = randomBytes(256).toString('hex');
    const hashedPassword = createHmac('sha256', salt).update(password).digest('hex');

    const [user] = await db.insert(usersTable).values({
        firstName,
        lastName,
        email,
        salt,
        password: hashedPassword,
    }).returning({
        id: usersTable.id,
    });

    return res.status(201).json({ success: user.id});
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const error = loginValidation(email, password);

    if(error) {
        return res.status(400).json(error);
    };

    const user = await getUser(email);

    if(!user) {
        return res.status(400).json({ error: 'Invalid email.'});
    };

    const salt = user.salt;
    const newHashedPassword = createHmac('sha256', salt).update(password).digest('hex');

    if(user.password !== newHashedPassword) {
        return res.status(400).json({ error: 'Invalid password' });
    };

    return res.json({ success: 'Logged in successfully.'});
});

export default router;