import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
   {
      title: {
         type: String,
      },
      description: {
         type: String,
      },
      userId: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
);

const Note = mongoose.model("note", notesSchema);

export default Note;
