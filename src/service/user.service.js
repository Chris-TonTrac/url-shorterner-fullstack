import { eq } from "drizzle-orm";
import db from "../db/index.js";
import { usersTable } from "../model/user.model.js";

export async function getUser(email) {
  const [user] = await db
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

  return user;
};
