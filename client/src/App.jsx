import "./style.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Error from "./components/Error";
import Register from "./components/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./features/account/accountSlice";

const App = () => {
   const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

   const user = useSelector(selectUser);

   const navigate = useNavigate();

   const dispatch = useDispatch();

   useEffect(() => {
      if (sessionStorage.getItem("auth-token") && user == null) {
         const data = sessionStorage.getItem("user-data");

         dispatch(login(JSON.parse(data)));
      }
   }, [navigate, user]); // eslint-disable-line

   return (
      <GoogleOAuthProvider clientId={clientId}>
         <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="*" element={<Error />} />
         </Routes>
         <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
         />
      </GoogleOAuthProvider>
   );
};

export default App;
