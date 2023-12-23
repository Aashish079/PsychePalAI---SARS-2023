import express from "express";
//Should add auth middleware to protect routes
import {
  getallJournals,
  getJournal,
  createJournal,
  updateJournal,
  deleteJournal,
} from "../controllers/journalControllers.js";



const router = express.Router();

router.get("/", getallJournals);
router.get("/:id", getJournal);
router.post("/", createJournal);
router.patch("/:id", updateJournal);
router.delete("/:id", deleteJournal);

export default router;
