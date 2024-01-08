import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { login, selectUser } from "../features/account/accountSlice";
import { useEffect } from "react";

const Error = () => {
   const user = useSelector(selectUser);

   const dispatch = useDispatch();

   useEffect(() => {
      if (sessionStorage.getItem("auth-token") && user == null) {
         const data = sessionStorage.getItem("user-data");

         dispatch(login(JSON.parse(data)));
      }
   }, [user]); // eslint-disable-line

   return (
      <>
         <Navbar />
         <div className="container min-h-screen !flex justify-center items-center">
            <div className=" space-y-9">
               <h1 className="text-4xl text-center">
                  We are sorry, the page you requested cannot be found.
               </h1>
               <p className="text-xl text-center font-light">
                  The URL may be misspelled or the page {"you're"} looking for
                  is no longer available.
               </p>
            </div>
         </div>
         <Footer />
      </>
   );
};

export default Error;
