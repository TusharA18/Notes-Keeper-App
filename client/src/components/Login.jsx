import { GoogleLogin } from "@react-oauth/google";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Login = () => {
   return (
      <div className="h-screen">
         <Navbar />
         <div className="container flex items-center justify-center lg:justify-between w-full h-full">
            <div className="hidden lg:block">
               <img src="/images/login-page.avif" alt="" />
            </div>
            <div className="md:px-20 py-10 space-y-8">
               <div className="space-y-3">
                  <h1 className="text-4xl font-semibold">Welcome!</h1>
                  <p className="text-[16px]">Please login to continue...</p>
               </div>
               <form className="space-y-4 w-full">
                  <div className="space-y-1">
                     <label className="ml-1">Email</label>
                     <input
                        className="w-full border border-gray-200 px-3 py-2 rounded-2xl focus:outline-[#4dd1bd]"
                        type="email"
                        name="email"
                        placeholder="Enter you Email"
                        required
                     />
                  </div>

                  <div className="space-y-1">
                     <label className="ml-1">Password</label>
                     <input
                        className="w-full border border-gray-200 px-3 py-2 rounded-2xl focus:outline-[#4dd1bd]"
                        type="password"
                        name="password"
                        placeholder="Enter your Password"
                        required
                     />
                  </div>

                  <p className="w-fit ml-auto text-sm text-[#009c8d] hover:underline hover:underline-offset-2 cursor-pointer">
                     Forgot Password?
                  </p>

                  <p className="w-fit mr-auto text-sm text-black">
                     {"Doesn't"} have an account?{" "}
                     <Link to="/register">
                        <span className="text-[#009c8d] hover:underline hover:underline-offset-2 cursor-pointer">
                           Register
                        </span>
                     </Link>
                  </p>

                  <button className="bg-[#009c84] px-3 py-2 rounded-2xl w-full text-white font-semibold">
                     Login
                  </button>
               </form>
               <div className="flex items-center">
                  <div className="bg-[#e9ebee] w-full h-[1px] relative">
                     <span className="text-[12px] text-[#bfc0c2] bg-white px-1 absolute -top-[9px] left-[29%]">
                        or login with google
                     </span>
                  </div>
               </div>
               <div className="flex justify-center">
                  <GoogleLogin type="icon" shape="circle" />
               </div>
            </div>
         </div>
         <Footer />
      </div>
   );
};

export default Login;
