import mongoose from "mongoose";
import { analyzeEntry } from "./ai.js";
import { Analysis } from "../models/Analysis.models.js";

export const getallJournals = async (req, res) => {
//   const user_id = req.user._id;
//   console.log(req.user);

  try {
    const journals = await Journal.find({}).sort({ createdAt: -1 }); // Returns all journals in the database in an array
    res.status(200).json(journals);
    return journals;
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//CRUD Operations
export const createJournal = async (req, res) => {
  const { date, title, content, userId } = req.body;
//   const userId = req.user._id;
//   console.log(req)
  try {
    const journal = new Journal({
        id: "04",
        date,
        title,
        content,
    })
    await journal.save();
    console.log("Journal created with id: ", journal.title)
    res.status(200).json(journal);
    console.log("content", content);
    const analysis = await analyzeEntry(content);
    console.log("Analysis created with id: ", analysis);
    const analysisdb = new Analysis({
        entry: journal._id,
        mood: analysis.mood,
        subject: analysis.subject,
        negative: analysis.negative,
        summary: analysis.summary,
        counsel: analysis.counsel,
        sentimentScore: analysis.sentimentScore
    });
    analysisdb.save();
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getAnalysis = async (req, res) => {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id))
        return res
        .status(404)
        .json({ error: "Analysis doesn't exist with that id" });
    
    try {
        const analysis = await Analysis.findById(id);
        res.status(200).json(analysis);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const getallAnalysis = async (req, res) => {
    //   const user_id = req.user._id;
    //   console.log(req.user);
    
      try {
        const analysis = await Analysis.find({}).sort({ createdAt: -1 }); // Returns all journals in the database in an array
        res.status(200).json(analysis);
        return analysis;
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
    };


