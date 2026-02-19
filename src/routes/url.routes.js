import express from "express";
import db from "../db/index.js";
import { urlsTable } from "../model/url.model.js";
import { validateUrl } from "../validation/url.validation.js";
import { nanoid } from "nanoid";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { and, eq } from "drizzle-orm";

const router = express.Router();

router.post("/shorten", authMiddleware, async (req, res) => {
  const { targetUrl, shortCode: providedShortCode } = req.body;

  const error = validateUrl(targetUrl);

  if (error) {
    return res.status(400).json(error);
  }

  const shortCode = providedShortCode ?? nanoid(15);

  const [result] = await db
    .insert(urlsTable)
    .values({
      userid: req.user.id,
      targetUrl,
      shortCode,
    })
    .returning({
      shortCode: urlsTable.shortCode,
    });

  return res.status(201).json({ success: { shortCode: result.shortCode } });
});

router.get("/codes", authMiddleware, async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Invalid token payload." });
  }

  const codes = await db
    .select({ 
      targetUrl: urlsTable.targetUrl, 
      shortCode: urlsTable.shortCode 
    })
    .from(urlsTable)
    .where(eq(urlsTable.userid, userId));

  return res.json({ codes });
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const userId = req.user?.id;
  const urlId = req.params.id;

  if(!userId) {
    return res.status(401).json({ error: 'Invalid token payload.'});
  };

  const deletedRows = await db
    .delete(urlsTable)
    .where(
      and(
        eq(urlsTable.userid, userId),
        eq(urlsTable.id, urlId)
      )
    )
    .returning({ id: urlsTable.id });

  if (deletedRows.length === 0) {
    return res.status(404).json({ error: "URL not found for this user." });
  }

  return res.json({ success: "URL deleted successfully." });
});

router.get("/:shortCode", async (req, res) => {
  const code = req.params.shortCode;

  const [result] = await db
    .select({
      targetUrl: urlsTable.targetUrl,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, code));

  if (!result) {
    return res.status(404).json({ error: "Invalid short code provided." });
  }

  return res.redirect(result.targetUrl);
});
export default router;
