import express from "express";
import dotenv from "dotenv";
import connectDb from "./db/db.js";
import JournalRoutes from "./routes/journals.js";
import AnalysisRoutes from "./routes/analysis.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 8080;
const app = express();
app.use(cors({ origin:true, credentials: true }));
app.use(express.json());

app.use("/api/journals", JournalRoutes);
app.use("/api/analysis", AnalysisRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
// Connect to MongoDB
connectDb();
