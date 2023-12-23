import { required } from "joi";
import mongoose from "mongoose";

const AnalysisSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    entry: {
      type: String,
      required: true,
      ref: "Journal",
    },
    userId: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      ref: "User",
    },
    mood: {
      type: String,
    },
    subject: {
      type: String,
    },
    negative: { 
        type: Boolean 
    },
    summary: { 
        type: String 
    },
    sentimentScore: { 
        type: Number
    }
  },
  { timestamps: true }
);

export const Analysis = mongoose.model("Analysis", AnalysisSchema);
