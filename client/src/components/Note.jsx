import { useContext } from "react";
import { formatDate } from "../utils/formatDate";
import { ModalContext } from "../context/ModalContextProvider";
import PropTypes from "prop-types";
import parse from "html-react-parser";

const Note = ({ note }) => {
   const { setShowEditNoteModal, setModalData } = useContext(ModalContext);

   const handleClick = () => {
      setShowEditNoteModal(true);

      setModalData(note);
   };

   return (
      <div
         onClick={handleClick}
         className="w-[17rem] 3xl:w-[19rem] h-60 border-2 border-gray-500 shadow-xl rounded-lg p-5 space-y-3 overflow-hidden flex flex-col justify-between cursor-pointer transition-all hover:-translate-y-2"
      >
         <div className="overflow-hidden space-y-3">
            <h1 className="h-7 text-xl text-[#009d84] font-semibold whitespace-nowrap">
               {note.title ? note.title : "Title not available"}
            </h1>
            <hr className="bg-gray-300" />
         </div>
         <div className="overflow-hidden">
            <p className="h-24 break-words">
               {note.description
                  ? parse(note.description.replace(/\n/g, "<br/>"))
                  : "Description not available"}
            </p>
         </div>
         <div className="flex justify-end">
            <p className="text-sm text-gray-500">
               {note.date ? formatDate(note.date) : "Date not available"}
            </p>
         </div>
      </div>
   );
};

Note.propTypes = {
   note: PropTypes.object,
};

export default Note;
