import express from "express";
import db from "../db/index.js";
import { urlsTable } from "../model/url.model.js";
import { validateUrl } from "../validation/url.validation.js";
import { nanoid } from "nanoid";

const router = express.Router();

router.post("/shorten", async (req, res) => {
  const { targetUrl, code, userId } = req.body;

  const error = validateUrl(targetUrl, userId);

  if (error) {
    return res.status(400).json(error);
  }

  const shortCode = code ?? nanoid(15);

  const [result] = await db
    .insert(urlsTable)
    .values({
      userid: userId,
      targetUrl,
      shortCode,
    })
    .returning({
      shortCode: urlsTable.shortCode,
    });

  return res.status(201).json({ success: { shortCode: result.shortCode } });
});

router.get('/codes', async (req, res) => {

});

router.delete('/:id', async (req, res) => {

});

router.get('/:shortCode', async (req, res) => {

});
export default router;
