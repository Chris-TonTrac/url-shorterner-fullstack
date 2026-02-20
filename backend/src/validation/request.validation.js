import { email, z } from "zod";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

export const signUpValidation = z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
    email: z.string().email(),
    password: z
        .string()
        .regex(PASSWORD_REGEX, {
            message: "password must be at least 8 characters and include uppercase, lowercase, number, and special character."
        })
});

export const loginValidation = z.object({
    email: z.string().email(),
    password: z.string().min(3)
});

export const shortCodeValidation = z.object({
    url: z.string().url(),
    code: z.string().max(20).optional(),
})