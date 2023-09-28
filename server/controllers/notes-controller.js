import Note from "../models/Note.js";

export const addNote = async (req, res) => {
   try {
      const { title, description } = req.body.note;

      const id = req.user.id;

      const newNote = await Note.create({
         title,
         description,
         userId: id,
      });

      await newNote.save();

      return res.status(200).json({
         msg: "Note created successfully",
         note: {
            title: newNote.title,
            description: newNote.description,
         },
         success: true,
      });
   } catch (error) {
      return res.status(500).json({
         msg: "Internal server error!",
         error: error.message,
         success: false,
      });
   }
};

export const getNotes = async (req, res) => {
   try {
      const id = req.user.id;

      const notes = await Note.find({ userId: id });

      if (notes.length === 0) {
         return res.status(200).json({
            errors: [{ msg: "No notes found" }],
            success: false,
         });
      }

      let data = [];

      for (let i = 0; i < notes.length; i++) {
         let note = {};

         note._id = notes[i]._id;
         note.title = notes[i].title;
         note.description = notes[i].description;
         note.date = notes[i].updatedAt;

         data.push(note);
      }

      return res.status(200).json({
         msg: "Notes fetched successfully",
         notes: data,
         success: true,
      });
   } catch (error) {
      return res.status(500).json({
         msg: "Internal server error!",
         error: error.message,
         success: false,
      });
   }
};

export const updateNote = async (req, res) => {
   try {
      const { id, title, description, date } = req.body.note;

      const note = await Note.findOne({ _id: id });

      if (!note) {
         return res.status(200).json({
            errors: [{ msg: "No note found" }],
            success: false,
         });
      }

      let data = {
         title,
         description,
         updatedAt: date,
      };

      await Note.findByIdAndUpdate(id, { $set: data }, { new: true });

      return res.status(200).json({
         msg: "Notes updated successfully",
         success: true,
      });
   } catch (error) {
      return res.status(500).json({
         msg: "Internal server error!",
         error: error.message,
         success: false,
      });
   }
};

export const deleteNote = async (req, res) => {
   try {
      const { id } = req.body.note;

      const note = await Note.findOne({ _id: id });

      if (!note) {
         return res.status(200).json({
            errors: [{ msg: "No note found" }],
            success: false,
         });
      }

      await Note.findByIdAndDelete(id);

      return res.status(200).json({
         msg: "Notes deleted successfully",
         success: true,
      });
   } catch (error) {
      return res.status(500).json({
         msg: "Internal server error!",
         error: error.message,
         success: false,
      });
   }
};
