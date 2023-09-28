import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ModalContext = createContext();

const ModalProvider = ({ children }) => {
   const [showAddNoteModal, setShowAddNoteModal] = useState(false);
   const [showEditNoteModal, setShowEditNoteModal] = useState(false);
   const [modalData, setModalData] = useState();

   return (
      <ModalContext.Provider
         value={{
            showAddNoteModal,
            setShowAddNoteModal,
            showEditNoteModal,
            setShowEditNoteModal,
            modalData,
            setModalData,
         }}
      >
         {children}
      </ModalContext.Provider>
   );
};

ModalProvider.propTypes = {
   children: PropTypes.node,
};

export default ModalProvider;
