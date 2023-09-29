import { GoogleLogin } from "@react-oauth/google";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import Loader from "./Loader";
import { LoaderContext } from "../context/LoaderContextProvider";
import { googleAuth, loginUser } from "../api/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../features/account/accountSlice";

const Login = () => {
   const [cred, setCred] = useState({ email: "", password: "" });

   const { loading, setLoading, alertMessage, setAlertMessage } =
      useContext(LoaderContext);

   const dispatch = useDispatch();

   const navigate = useNavigate();

   useEffect(() => {
      if (!alertMessage) {
         alert(
            "This site is using a shared server, so the first login may take upto 20 seconds!"
         );
      }

      setAlertMessage(true);
   }, []); // eslint-disable-line

   useEffect(() => {
      document.title = "Login - Notes Keeper";
   }, []);

   useEffect(() => {
      if (sessionStorage.getItem("auth-token")) {
         navigate("/");
      }
   }, [navigate]);

   const handleChange = (e) => {
      const { name, value } = e.target;

      setCred((prev) => ({ ...prev, [name]: value }));
   };

   const handleError = (data) => {
      data.map((error) => toast(error.msg, { type: "error" }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      setLoading(true);

      const data = await loginUser({
         email: cred.email,
         password: cred.password,
      });

      setLoading(false);

      if (!data.success) {
         handleError(data.errors);

         return;
      }

      dispatch(login(data.user));

      toast(data.msg, { type: "success" });

      sessionStorage.setItem("auth-token", data.token);
      sessionStorage.setItem("user-data", JSON.stringify(data.user));

      navigate("/");
   };

   const handleSuccess = async (res) => {
      const decode = jwt_decode(res.credential);

      const payload = {
         name: decode.given_name + " " + decode.family_name,
         email: decode.email,
         sub: decode.sub,
         photo: decode.picture,
      };
      setLoading(true);

      const data = await googleAuth(payload);

      setLoading(false);

      if (!data.success) {
         handleError(data.errors);

         return;
      }

      dispatch(login(data.user));

      toast(data.msg, { type: "success" });

      sessionStorage.setItem("auth-token", data.token);
      sessionStorage.setItem("user-data", JSON.stringify(data.user));

      navigate("/");
   };

   return (
      <div className="h-screen">
         <Navbar />
         <div className="container flex items-center justify-center lg:justify-between w-full min-h-screen">
            <div className="hidden lg:block">
               <img src="/images/login-page.avif" alt="" />
            </div>
            <div className="md:px-20 py-10 space-y-5">
               <div className="space-y-3">
                  <h1 className="text-4xl font-semibold">Welcome!</h1>
                  <p className="text-[16px]">Please login to continue...</p>
               </div>
               <div className="space-y-2">
                  <hr />
                  <h1 className="text-lg font-bold">Demo Account</h1>
                  <div>
                     <p>
                        <b>Email :</b> test1@test.com
                     </p>
                     <p>
                        <b>Password :</b> Test@123
                     </p>
                  </div>
                  <hr />
               </div>
               <form className="space-y-4 w-80" onSubmit={handleSubmit}>
                  <div className="space-y-1">
                     <label className="ml-1">Email</label>
                     <input
                        className="w-full border border-gray-300 px-3 py-2 rounded-2xl focus:outline-[#4dd1bd]"
                        type="email"
                        name="email"
                        value={cred.email}
                        onChange={handleChange}
                        placeholder="Enter you Email"
                     />
                  </div>

                  <div className="space-y-1">
                     <label className="ml-1">Password</label>
                     <input
                        className="w-full border border-gray-300 px-3 py-2 rounded-2xl focus:outline-[#4dd1bd]"
                        type="password"
                        name="password"
                        value={cred.password}
                        onChange={handleChange}
                        placeholder="Enter your Password"
                     />
                  </div>

                  <p className="w-fit ml-auto text-sm text-[#009c8d] hover:underline hover:underline-offset-2 cursor-pointer">
                     Forgot Password?
                  </p>

                  <button className="bg-[#009c84] hover:bg-white hover:text-[#42aa9b] hover:outline hover:outline-2 transition-all px-3 py-2 h-12 rounded-2xl w-full text-white font-semibold text-lg group">
                     {loading ? (
                        <Loader addClass="group-hover:border-[#009c84] group-hover:border-b-transparent" />
                     ) : (
                        "Login"
                     )}
                  </button>

                  <p className="w-fit mx-auto text-sm text-black">
                     {"Doesn't"} have an account?{" "}
                     <Link to="/register">
                        <span className="text-[#009c8d] hover:underline hover:underline-offset-2 cursor-pointer">
                           {" "}
                           Register
                        </span>
                     </Link>
                  </p>
               </form>
               <div className="flex items-center">
                  <div className="bg-[#e9ebee] w-full h-[1px] relative">
                     <span className="text-[12px] text-[#b0b0b0] bg-white px-1 absolute -top-[9px] left-[29%]">
                        or login with google
                     </span>
                  </div>
               </div>
               <div className="flex justify-center">
                  <GoogleLogin
                     type="icon"
                     shape="circle"
                     onSuccess={handleSuccess}
                     onError={(err) => console.log(err)}
                  />
               </div>
            </div>
         </div>
         <Footer />
      </div>
   );
};

export default Login;
