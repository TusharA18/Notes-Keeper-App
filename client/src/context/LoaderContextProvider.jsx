import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const LoaderContext = createContext();

const LoaderProvider = ({ children }) => {
   const [loading, setLoading] = useState(false);
   const [alertMessage, setAlertMessage] = useState(false);

   return (
      <LoaderContext.Provider
         value={{ loading, setLoading, alertMessage, setAlertMessage }}
      >
         {children}
      </LoaderContext.Provider>
   );
};

LoaderProvider.propTypes = {
   children: PropTypes.node,
};

export default LoaderProvider;
