import Navbar from "./Navbar";
import Footer from "./Footer";
import { GoogleLogin } from "@react-oauth/google";
import { useContext, useEffect, useState } from "react";
import { googleAuth, registerUser } from "../api/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/account/accountSlice";
import jwt_decode from "jwt-decode";
import Loader from "./Loader";
import { LoaderContext } from "../context/LoaderContextProvider";

const convertToBase64 = (file) => {
   return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
         resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
         reject(error);
      };
   });
};

const Login = () => {
   const [cred, setCred] = useState({ name: "", email: "", password: "" });
   const [photo, setPhoto] = useState({ myFile: "" });

   const { loading, setLoading } = useContext(LoaderContext);

   const dispatch = useDispatch();

   const navigate = useNavigate();

   useEffect(() => {
      if (sessionStorage.getItem("auth-token")) {
         navigate("/");
      }
   }, [navigate]);

   const handleChange = (e) => {
      const { name, value } = e.target;

      setCred((prev) => ({ ...prev, [name]: value }));
   };

   const handlePhotoUpload = async (e) => {
      const file = e.target.files[0];

      const base64 = await convertToBase64(file);

      setPhoto((prev) => ({ ...prev, myFile: base64 }));
   };

   const handleRegisterError = (data) => {
      data.map((error) => toast(error.msg, { type: "error" }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      setLoading(true);

      const data = await registerUser({
         name: cred.name,
         email: cred.email,
         password: cred.password,
         photo: photo.myFile,
      });

      setLoading(false);

      if (!data.success) {
         handleRegisterError(data.errors);

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

      const data = await googleAuth(payload);

      if (!data.success) {
         handleRegisterError(data.errors);

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
         <div className="container flex items-center justify-center lg:justify-between w-fit h-full">
            <div className="hidden lg:block">
               <img src="/images/register-page.avif" alt="" />
            </div>
            <div className="md:px-20 py-10 space-y-6">
               <div className="space-y-3">
                  <h1 className="text-4xl font-semibold">Welcome!</h1>
                  <p className="text-[16px]">
                     Please enter your credentials to continue...
                  </p>
               </div>
               <form className="space-y-3 w-80" onSubmit={handleSubmit}>
                  <div className="space-y-1">
                     <label className="ml-1">Name</label>
                     <input
                        className="w-full border border-gray-200 px-3 py-2 rounded-lg focus:outline-[#4dd1bd]"
                        type="text"
                        name="name"
                        value={cred.name}
                        onChange={handleChange}
                        placeholder="Enter you Name"
                     />
                  </div>

                  <div className="space-y-1">
                     <label className="ml-1">Email</label>
                     <input
                        className="w-full border border-gray-200 px-3 py-2 rounded-lg focus:outline-[#4dd1bd]"
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
                        className="w-full border border-gray-200 px-3 py-2 rounded-lg focus:outline-[#4dd1bd]"
                        type="password"
                        name="password"
                        value={cred.password}
                        onChange={handleChange}
                        placeholder="Enter your Password"
                        minLength={8}
                     />
                     <p className="text-[12px] text-gray-600 text-center w-full">
                        Password must be greater than 8 and contain at least one
                        uppercase letter, one lowercase letter, and one number
                     </p>
                  </div>

                  <div className="space-y-1">
                     <label className="ml-1">Picture</label>
                     <input
                        className="w-full border border-gray-200 rounded-lg p-1"
                        type="file"
                        name="photo"
                        onChange={handlePhotoUpload}
                     />
                  </div>

                  <button className="bg-[#009c84] hover:bg-[#42aa9b] transition-all px-3 py-2 h-12 rounded-2xl w-full text-white font-semibold text-lg">
                     {loading ? <Loader /> : "Register"}
                  </button>

                  <p className="w-fit mx-auto text-sm text-black">
                     Already have an account?
                     <Link to="/login">
                        <span className="text-[#009c8d] hover:underline hover:underline-offset-2 cursor-pointer">
                           {" "}
                           Login
                        </span>
                     </Link>
                  </p>
               </form>

               <div className="flex items-center">
                  <div className="bg-[#e9ebee] w-full h-[1px] relative">
                     <span className="text-[12px] text-[#b0b0b0] bg-white px-1 absolute -top-[9px] left-[29%]">
                        or register with google
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
