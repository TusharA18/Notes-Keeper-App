import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectToDB from "./database/db.js";
import authRouter from "./routes/authRoutes.js";
import notesRouter from "./routes/notesRoutes.js";

// configuration
dotenv.config();

connectToDB();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api/auth", authRouter);
app.use("/api/notes", notesRouter);

// listen
app.listen(port, () => console.log(`Server running at port:${port}`));
