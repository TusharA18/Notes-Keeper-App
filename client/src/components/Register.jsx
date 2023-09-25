import Navbar from "./Navbar";
import Footer from "./Footer";

const Login = () => {
   return (
      <div className="h-screen">
         <Navbar />
         <div className="container flex items-center justify-center lg:justify-between w-full h-full">
            <div className="hidden lg:block">
               <img src="/images/register-page.avif" alt="" />
            </div>
            <div className="md:px-20 py-10 space-y-8">
               <div className="space-y-3">
                  <h1 className="text-4xl font-semibold">Welcome!</h1>
                  <p className="text-[16px]">
                     Please enter your credentials to continue...
                  </p>
               </div>
               <form className="space-y-4 w-full">
                  <div className="space-y-1">
                     <label className="ml-1">Name</label>
                     <input
                        className="w-full border border-gray-200 px-3 py-2 rounded-lg focus:outline-[#4dd1bd]"
                        type="text"
                        name="name"
                        placeholder="Enter you Name"
                        required
                     />
                  </div>

                  <div className="space-y-1">
                     <label className="ml-1">Email</label>
                     <input
                        className="w-full border border-gray-200 px-3 py-2 rounded-lg focus:outline-[#4dd1bd]"
                        type="email"
                        name="email"
                        placeholder="Enter you Email"
                        required
                     />
                  </div>

                  <div className="space-y-1">
                     <label className="ml-1">Password</label>
                     <input
                        className="w-full border border-gray-200 px-3 py-2 rounded-lg focus:outline-[#4dd1bd]"
                        type="password"
                        name="password"
                        placeholder="Enter your Password"
                        required
                     />
                  </div>

                  <div className="space-y-1">
                     <label className="ml-1">Picture</label>
                     <input
                        className="w-full border border-gray-200 rounded-lg p-1"
                        type="file"
                        name="photo"
                     />
                  </div>

                  <button className="bg-[#009c84] px-3 py-2 rounded-2xl w-full text-white font-semibold">
                     Login
                  </button>
               </form>
            </div>
         </div>
         <Footer />
      </div>
   );
};

export default Login;
