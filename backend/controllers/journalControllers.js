import mongoose from "mongoose";
import { Journal } from "../models/Journal.models.js";

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
        id: getallJournals.length + 1,
        date,
        title,
        content,
    })
    journal.save();
    console.log("Journal created with id: ", journalournal.title)
    res.status(200).json(newJournal);
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
