import express from "express";
//Should add auth middleware to protect routes
import {
  getallJournals,
  getJournal,
  createJournal,
  updateJournal,
  deleteJournal,
} from "../controllers/journalControllers.js";
import { getAnalysis, getallAnalysis } from "../controllers/analysiscControllers.js";



const router = express.Router();

router.get("/", getallAnalysis);
router.get("/:id", getAnalysis);

export default router;