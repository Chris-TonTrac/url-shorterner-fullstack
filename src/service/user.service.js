import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { usersTable } from "../model/user.model.js";

// Fetch a user by email — we also pull back the salt and hashed password
// so the login route can verify the incoming password against them.
export async function getUser(email) {
  const users = await db
    .select({
        id: usersTable.id,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
        email: usersTable.email,
        salt: usersTable.salt,
        password: usersTable.password,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  return users;
};

// Insert a new user row and give back the generated id.
// The password coming in here should already be hashed — never store plain text.
export async function createUser(firstName, lastName, email, hashedPassword, salt) {
  const [user] = await db.insert(usersTable).values({
        firstName,
        lastName,
        email,
        salt,
        password: hashedPassword,
    }).returning({
        id: usersTable.id,
    });

    return user;
};