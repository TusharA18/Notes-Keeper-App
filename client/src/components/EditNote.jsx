import { useContext, useState } from "react";
import { ModalContext } from "../context/ModalContextProvider";
import CloseIcon from "@mui/icons-material/Close";
import Loader from "./Loader";
import { deleteNote, updateNote } from "../api/api";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
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

const EditModal = ({ changeFlag, setChangeFlag }) => {
   const { setShowEditNoteModal, modalData, setModalData } =
      useContext(ModalContext);

   const [note, setNote] = useState(modalData ?? {});
   const [updateLoading, setUpdateLoading] = useState(false);
   const [deleteLoading, setDeleteLoading] = useState(false);
   const [dataFlag, setDataFlag] = useState(true);

   const handleToggle = () => {
      setShowEditNoteModal(false);
   };

   const handleChange = (e) => {
      const { name, value } = e.target;

      setNote((prev) => ({ ...prev, [name]: value }));

      setDataFlag(false);
   };

   const handleError = (data) => {
      data.map((error) => toast(error.msg, { type: "error" }));
   };

   const handleUpdate = async () => {
      setUpdateLoading(true);

      const data = await updateNote({
         note: {
            id: note?._id,
            title: note?.title,
            description: note?.description,
            date: Date.now(),
         },
         token: sessionStorage.getItem("auth-token"),
      });

      setUpdateLoading(false);

      if (!data.success) {
         handleError(data.errors);
         return;
      }

      toast(data.msg, { type: "success" });

      setModalData();
      setChangeFlag(!changeFlag);
      setShowEditNoteModal(false);
      setDataFlag(true);
   };

   const handleDelete = async () => {
      setDeleteLoading(true);

      const data = await deleteNote({
         note: {
            id: note?._id,
         },
         token: sessionStorage.getItem("auth-token"),
      });

      setDeleteLoading(false);

      if (!data.success) {
         handleError(data.errors);
         return;
      }

      toast(data.msg, { type: "success" });

      setModalData();
      setChangeFlag(!changeFlag);
      setShowEditNoteModal(false);
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
            className="px-6 py-6 w-80 md:w-96 xl:w-[40rem] bg-white rounded-2xl mx-auto my-32 space-y-5"
         >
            <div className="flex justify-between items-center !m-0">
               <div className="text-3xl  text-gray-700">Edit the note</div>
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
                     value={note?.title}
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
                     id="description"
                     rows="7"
                     value={note?.description}
                     onChange={handleChange}
                     placeholder="Add a description"
                  ></textarea>
               </div>
            </div>
            <div className="flex justify-end space-x-3">
               <button
                  onClick={handleUpdate}
                  disabled={
                     (note?.title === "" && note?.description === "") ||
                     dataFlag
                        ? true
                        : false
                  }
                  className={`${
                     (note?.title === "" && note?.description === "") ||
                     dataFlag
                        ? "bg-[#42aa9b]"
                        : "bg-[#009c84] hover:bg-white hover:text-[#009c84] hover:outline hover:outline-2"
                  } px-5 py-2 h-11 w-24 rounded-lg text-white transition-all group`}
               >
                  {updateLoading ? (
                     <Loader addClass="group-hover:border-[#009c84] group-hover:border-b-transparent" />
                  ) : (
                     "Update"
                  )}
               </button>
               <button
                  onClick={handleDelete}
                  className="bg-[#e54444] hover:bg-white hover:text-[#e54444]  hover:outline hover:outline-2 px-5 py-2 h-11 w-24 rounded-lg text-white transition-all group"
               >
                  {deleteLoading ? (
                     <Loader addClass="group-hover:border-[#e54444] group-hover:border-b-transparent" />
                  ) : (
                     "Delete"
                  )}
               </button>
            </div>
         </motion.div>
      </div>
   );
};

EditModal.propTypes = {
   changeFlag: PropTypes.bool,
   setChangeFlag: PropTypes.func,
};

export default EditModal;
