import express from "express";
import { verifyToken } from "../middleware/auth-middleware.js";
import {
   addNote,
   deleteNote,
   getNotes,
   updateNote,
} from "../controllers/notes-controller.js";

const router = express.Router();

router.post("/addNote", verifyToken, addNote);

router.post("/getNotes", verifyToken, getNotes);

router.put("/updateNote", verifyToken, updateNote);

router.post("/deleteNote", verifyToken, deleteNote);

export default router;
