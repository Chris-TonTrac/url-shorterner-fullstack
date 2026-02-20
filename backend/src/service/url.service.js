import db from "../db/index.js";
import { urlsTable } from "../model/url.model.js";
import { and, eq } from "drizzle-orm";

export async function createShortCode(targetUrl, shortCode, userid) {
    const [result] = await db
    .insert(urlsTable)
    .values({
      userid,
      targetUrl,
      shortCode,
    })
    .returning({
      shortCode: urlsTable.shortCode,
    });

    return result;
};

export async function getUserCodes(userId) {
    const codes = await db
    .select({
      targetUrl: urlsTable.targetUrl,
      shortCode: urlsTable.shortCode
    })
    .from(urlsTable)
    .where(eq(urlsTable.userid, userId));

    return codes;
};

export async function deleteShortCodeById(urlId, userId) {
    const deletedRows = await db
    .delete(urlsTable)
    .where(
      and(
        eq(urlsTable.userid, userId),
        eq(urlsTable.id, urlId)
      )
    )
    .returning({ id: urlsTable.id });

    return deletedRows;
};

export async function getTargetUrl(code) {
    const [result] = await db
    .select({
      targetUrl: urlsTable.targetUrl,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, code));

    return result;
}