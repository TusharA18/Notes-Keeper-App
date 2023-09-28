import "./style.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Error from "./components/Error";
import Register from "./components/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./components/Profile";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login, selectUser } from "./features/account/accountSlice";

const App = () => {
   const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

   const user = useSelector(selectUser);

   const dispatch = useDispatch();

   useEffect(() => {
      alert(
         "This site is using a shared server, so the first login may take upto 20 seconds!"
      );
   }, []);

   useEffect(() => {
      if (sessionStorage.getItem("auth-token") && user == null) {
         const data = JSON.parse(sessionStorage.getItem("user-data"));

         dispatch(login(data));
      }
   }, [user]); // eslint-disable-line

   return (
      <GoogleOAuthProvider clientId={clientId}>
         <Routes>
            <Route
               exact
               path="/"
               element={<ProtectedRoute Component={Home} />}
            />
            <Route
               exact
               path="/profile"
               element={<ProtectedRoute Component={Profile} />}
            />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="*" element={<Error />} />
         </Routes>
         <ToastContainer
            position="top-center"
            autoClose={1000}
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
