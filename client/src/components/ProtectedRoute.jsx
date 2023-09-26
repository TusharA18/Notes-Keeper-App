import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/account/accountSlice";

const ProtectedRoute = ({ Component }) => {
   const navigate = useNavigate();

   const user = useSelector(selectUser);

   const dispatch = useDispatch();

   useEffect(() => {
      if (!sessionStorage.getItem("auth-token")) {
         navigate("/login");
      } else if (user == null) {
         const data = sessionStorage.getItem("user-data");

         dispatch(login(JSON.parse(data)));
      }
   }, [navigate, user]); // eslint-disable-line

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
