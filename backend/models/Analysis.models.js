import mongoose from "mongoose";

const AnalysisSchema = new mongoose.Schema(
  {
    entry: {
      type: String,
      required: true,
      ref: "Journal",
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
    counsel: { 
        type: String 
    },
    sentimentScore: { 
        type: Number
    },
    user: {
      type: String,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Analysis = mongoose.model("Analysis", AnalysisSchema);
