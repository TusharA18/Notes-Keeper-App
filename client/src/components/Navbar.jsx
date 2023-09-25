import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../features/account/accountSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
   const user = useSelector(selectUser);

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const handleSignOut = () => {
      dispatch(logout());

      sessionStorage.removeItem("auth-token");

      navigate("/login");
   };

   return (
      <div className="container fixed py-3 backdrop-filter backdrop-blur-2xl flex items-center justify-between h-16 shadow-lg">
         <Link to="/">
            <div className="flex items-center justify-center space-x-2">
               <img className="w-8 rounded-xl" src="/images/logo.jpg" alt="" />
               <h1 className="font-semibold text-md md: text-lg xl:text-2xl">
                  Notes Keeper
               </h1>
            </div>
         </Link>
         <div className="flex items-center justify-center space-x-3">
            {user == null ? (
               <>
                  <button
                     onClick={() => navigate("/login")}
                     className="px-6 py-2 rounded-2xl transition-all text-white bg-[#009c8d] hover:bg-white hover:text-[#009c8d] font-semibold"
                  >
                     Login
                  </button>
                  <button
                     onClick={() => navigate("/register")}
                     className="text-white bg-[#009c84] hover:bg-white hover:text-[#009c8d] transition-all px-5 py-2 rounded-2xl font-semibold"
                  >
                     Register
                  </button>
               </>
            ) : (
               <>
                  <button
                     onClick={handleSignOut}
                     className="text-white bg-[#009c84] hover:bg-white hover:text-[#009c8d] transition-all px-5 py-2 rounded-2xl"
                  >
                     Sign out
                  </button>
                  <div className="relative group">
                     <img
                        className="w-10 h-10 rounded-2xl cursor-pointer"
                        src={
                           user && user?.photo && user?.photo?.length !== 0
                              ? user?.photo || "/images/anonymous-user.webp"
                              : "/images/anonymous-user.webp"
                        }
                        alt=""
                     />
                     <div className="absolute bg-white px-2 py-1 border border-gray-400 rounded-xl top-10 -left-3 hidden group-hover:block">
                        Profile
                     </div>
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

export default Navbar;
