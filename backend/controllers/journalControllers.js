import mongoose from "mongoose";
import { Journal } from "../models/Journal.models.js";
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
  const { id, date, title, content, userId } = req.body;
  //   const userId = req.user._id;
  //   console.log(req)
  try {
    const journal = new Journal({
      id,
      date,
      title,
      content,
    });
    await journal.save();
    console.log("Journal created with id: ", journal.title);
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
      sentimentScore: analysis.sentimentScore,
    });
    await analysisdb.save();
    console.log(journal, analysisdb);
    res.status(200).json({ journal, analysisdb });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getJournal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ error: "Journal doesn't exist with that id" });

  try {
    const journal = await Journal.findById(id);
    res.status(200).json(journal);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const updateJournal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res
      .status(404)
      .json({ error: "Journal doesn't exist with that id" });

  try {
    const journal = await Journal.findById(id);
    if (!journal)
      return res
        .status(404)
        .json({ error: "Journal doesn't exist with that id" });
    const updatedJournal = await Journal.findOneAndUpdate(
      { _id: id },
      { ...req.body }
    );
    res.status(200).json(updatedJournal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteJournal = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "Journal doesn't exist" });

  try {
    const journal = await Journal.findById(id);
    if (!journal)
      return res.status(404).json({ error: "Journal doesn't exist" });
    const deletedJournal = await Journal.findOneAndDelete({ _id: id });
    res.status(200).json(deletedJournal);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
