import express from "express";
import { shortCodeValidation } from "../validation/request.validation.js";
import { nanoid } from "nanoid";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { createShortCode, getUserCodes, deleteShortCodeById, getTargetUrl } from "../service/url.service.js";

const router = express.Router();

// --- Shorten a URL ---
// The user can optionally supply their own short code; if they don't, we generate
// a random 15-character one via nanoid. Either way we validate it before saving.
router.post("/shorten", authMiddleware, async (req, res) => {
  const validationResult = await shortCodeValidation.safeParseAsync(req.body);

  if (validationResult.error) {
    return res.status(400).json({ error: validationResult.error.format() });
  };

  const { url, code } = validationResult.data;

  // Fall back to a generated code when none was supplied
  const shortCode = code ?? nanoid(15);

  const result = await createShortCode(url, shortCode, req.user.id);

  return res.status(201).json({ success: { shortCode: result.shortCode } });
});

// --- List all short codes for the logged-in user ---
router.get("/codes", authMiddleware, async (req, res) => {
  const userId = req.user?.id;

  // Shouldn't normally happen if the middleware is working, but just in case
  if (!userId) {
    return res.status(401).json({ error: "Invalid token payload." });
  };

  const codes = await getUserCodes(userId); 

  if(codes.length <= 0) {
    return res.json({ message: 'No short codes created yet.'});
  };

  return res.json({ codes });
});

// --- Delete a URL by id ---
// We include userId in the WHERE clause so a user can't delete someone else's links
router.delete("/:id", authMiddleware, async (req, res) => {
  const userId = req.user?.id;
  const urlId = req.params.id;

  if(!userId) {
    return res.status(401).json({ error: 'Invalid token payload.'});
  };

  const deletedRows = await deleteShortCodeById(urlId, userId);

  // Nothing was deleted — either wrong id or it doesn't belong to this user
  if (deletedRows.length === 0) {
    return res.status(404).json({ error: "URL not found for this user." });
  }

  return res.json({ success: "URL deleted successfully." });
});

// --- Redirect to the original URL ---
// This is the public-facing route — no auth needed, anyone with the short code
// can be redirected to where it points.
router.get("/:shortCode", async (req, res) => {
  const code = req.params.shortCode;

  const result = await getTargetUrl(code);

  // Short code exists but no matching row — treat it the same as invalid
  if (!result) {
    return res.status(404).json({ error: "Invalid short code provided." });
  }

  return res.redirect(result.targetUrl);
});

export default router;
