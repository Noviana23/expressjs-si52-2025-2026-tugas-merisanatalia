import { Router } from "express";
import {
  createWord,
  getWords,
  getWordById,
  updateWord,
  deleteWord,
} from "../controllers/wordController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createWord);
router.get("/", authMiddleware, getWords);
router.get("/:id", authMiddleware, getWordById);
router.put("/:id", authMiddleware, updateWord);
router.delete("/:id", authMiddleware, deleteWord);

export default router;
