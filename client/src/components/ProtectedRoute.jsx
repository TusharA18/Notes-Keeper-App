import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ Component }) => {
   const navigate = useNavigate();

   useEffect(() => {
      if (!sessionStorage.getItem("auth-token")) {
         navigate("/login");
      }
   }, []); // eslint-disable-line

   return (
      <>
         <Component />
      </>
   );
};

ProtectedRoute.propTypes = {
   Component: PropTypes.func,
};

export default ProtectedRoute;
