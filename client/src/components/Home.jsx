import { useContext, useEffect, useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Note from "./Note";
import AddNote from "./AddNote";
import { ModalContext } from "../context/ModalContextProvider";
import EditModal from "./EditNote";
import { getNotes } from "../api/api";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { AnimatePresence, motion } from "framer-motion";

const Home = () => {
   const { showAddNoteModal, setShowAddNoteModal, showEditNoteModal } =
      useContext(ModalContext);

   const [loading, setLoading] = useState(true);
   const [notes, setNotes] = useState([]);
   const [changeFlag, setChangeFlag] = useState(false);
   const [searchText, setSearchText] = useState("");

   useEffect(() => {
      document.title = "Notes Keeper";
   }, []);

   useEffect(() => {
      if (!sessionStorage.getItem("auth-token")) {
         return;
      }

      const fetchNotes = async () => {
         setLoading(true);

         const data = await getNotes({
            token: sessionStorage.getItem("auth-token"),
         });

         setLoading(false);

         if (!data.success) {
            handleError(data.errors);

            setNotes([]);

            return;
         }

         setNotes(data.notes);
      };

      fetchNotes();
   }, [changeFlag]); // eslint-disable-line

   const handleError = (data) => {
      data.map((error) => toast(error.msg, { type: "error" }));
   };

   return (
      <>
         <Navbar />
         <>
            <div className="container min-h-screen pt-20 pb-10 space-y-5">
               <div className="flex justify-center">
                  <div className="flex items-center w-[30rem] justify-start border-2 border-gray-500 rounded-2xl px-5 py-2 space-x-5 focus-within:shadow-xl">
                     <img
                        className="w-7"
                        src="/images/search-icon.png"
                        alt=""
                     />
                     <input
                        className="bg-transparent outline-none text-lg w-full"
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Search notes..."
                     />
                  </div>
               </div>
               <div className="space-y-3">
                  <div>
                     <h1 className="text-center text-5xl">Notes</h1>
                  </div>
                  <div className="flex justify-center xl:justify-end 2xl:mr-14 3xl:mr-20">
                     <motion.button
                        onClick={() => setShowAddNoteModal(true)}
                        className="text-white bg-[#009c84] hover:bg-white hover:text-[#009c8d] hover:outline transition-all px-5 py-2 mt-5 lg:mt-0 rounded-xl"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                     >
                        Add a note
                     </motion.button>
                  </div>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-5 3xl:ml-5">
                     {loading ? (
                        <Loader addClass="mx-auto my-32 w-32 h-32 border-[#009c84] border-b-transparent" />
                     ) : notes.length === 0 ? (
                        <div className="text-2xl pt-10">
                           No notes to display...
                        </div>
                     ) : (
                        notes
                           .sort((a, b) => {
                              const aDate = new Date(a.date);
                              const bDate = new Date(b.date);

                              return bDate.getTime() - aDate.getTime();
                           })
                           .filter(
                              (note) =>
                                 note.title
                                    .toLowerCase()
                                    .includes(searchText.toLowerCase()) ||
                                 note.description
                                    .toLowerCase()
                                    .includes(searchText.toLowerCase())
                           )
                           .map((note) => <Note key={note._id} note={note} />)
                     )}
                  </div>
               </div>
            </div>
            <AnimatePresence initial={false}>
               {showAddNoteModal && (
                  <AddNote
                     changeFlag={changeFlag}
                     setChangeFlag={setChangeFlag}
                  />
               )}
               {showEditNoteModal && (
                  <EditModal
                     changeFlag={changeFlag}
                     setChangeFlag={setChangeFlag}
                  />
               )}
            </AnimatePresence>
         </>
         <Footer />
      </>
   );
};

export default Home;
