import { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContextProvider";
import CloseIcon from "@mui/icons-material/Close";
import { LoaderContext } from "../context/LoaderContextProvider";
import Loader from "./Loader";
import PropTypes from "prop-types";
import { addNote } from "../api/api";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const dropIn = {
   hidden: {
      y: "-100vh",
      opacity: 0,
   },
   visible: {
      y: "0",
      opacity: 1,
   },
   exit: {
      y: "100vh",
      opacity: 0,
   },
};

const AddNote = ({ changeFlag, setChangeFlag }) => {
   const { setShowAddNoteModal } = useContext(ModalContext);
   const { loading, setLoading } = useContext(LoaderContext);

   const [note, setNote] = useState({ title: "", description: "" });

   const handleToggle = () => {
      setShowAddNoteModal(false);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;

      setNote((prev) => ({ ...prev, [name]: value }));
   };

   const handleClick = async () => {
      setLoading(true);

      const data = await addNote({
         note,
         token: sessionStorage.getItem("auth-token"),
      });

      setLoading(false);

      toast(data.msg, { type: "success" });

      setNote({ title: "", description: "" });
      setChangeFlag(!changeFlag);
      setShowAddNoteModal(false);
   };

   return (
      <div className="fixed inset-0 bg-transparent z-20">
         <motion.div
            onClick={handleToggle}
            className="absolute inset-0 w-screen h-screen -z-10 bg-black opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
         />
         <motion.div
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="px-6 py-6 w-80 md:w-96 xl:w-[40rem] bg-white z-30 rounded-2xl mx-auto my-32 space-y-5"
         >
            <div className="flex justify-between items-center !m-0">
               <div className="text-3xl  text-gray-700">Add a note</div>
               <div
                  onClick={handleToggle}
                  className="hover:bg-[#e54444] hover:text-white transition-all p-1 rounded-lg cursor-pointer"
               >
                  <CloseIcon />
               </div>
            </div>
            <hr className="bg-gray-300" />
            <div className="flex flex-col space-y-4">
               <div className="space-y-2">
                  <label className="ml-1" htmlFor="title">
                     Title
                  </label>
                  <input
                     id="title"
                     className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-[#4dd1bd]"
                     type="text"
                     name="title"
                     value={note.title}
                     onChange={handleChange}
                     placeholder="Add a title"
                  />
               </div>
               <div className="space-y-2">
                  <label className="ml-1" htmlFor="description">
                     Description
                  </label>
                  <textarea
                     className="resize-none w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-[#4dd1bd]"
                     name="description"
                     value={note.description}
                     onChange={handleChange}
                     id="description"
                     rows="7"
                     placeholder="Add a description"
                  ></textarea>
               </div>
            </div>
            <div className="flex justify-end space-x-3">
               <button
                  disabled={
                     note.title === "" && note.description === "" ? true : false
                  }
                  onClick={handleClick}
                  className={`${
                     note.title === "" && note.description === ""
                        ? "bg-[#42aa9b]"
                        : "bg-[#009c84] hover:bg-white hover:text-[#009c84] hover:outline hover:outline-2"
                  } px-8 py-2 h-11 w-24 rounded-lg text-white transition-all group`}
               >
                  {loading ? (
                     <Loader addClass="group-hover:border-[#009c84] group-hover:border-b-transparent" />
                  ) : (
                     "Add"
                  )}
               </button>
               <button
                  onClick={handleToggle}
                  className="bg-[#e54444] hover:bg-white hover:text-[#e54444]  hover:outline hover:outline-2 px-5 py-2 h-11 w-24 rounded-lg text-white transition-all"
               >
                  Cancel
               </button>
            </div>
         </motion.div>
      </div>
   );
};

AddNote.propTypes = {
   changeFlag: PropTypes.bool,
   setChangeFlag: PropTypes.func,
};

export default AddNote;
