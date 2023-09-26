import Navbar from "./Navbar";
import Footer from "./Footer";
import { login, selectUser } from "../features/account/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader";
import { LoaderContext } from "../context/LoaderContextProvider";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateUser } from "../api/api";

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

const Profile = () => {
   const user = useSelector(selectUser);

   const [cred, setCred] = useState({
      name: user?.name ?? "",
      email: user?.email ?? "",
      currentPassword: "",
      newPassword: "",
   });
   const [photo, setPhoto] = useState({ myFile: user?.photo });
   const [flag, setFlag] = useState(true);

   const { loading, setLoading } = useContext(LoaderContext);

   const dispatch = useDispatch();

   useEffect(() => {
      if (sessionStorage.getItem("auth-token") && user == null) {
         const data = JSON.parse(sessionStorage.getItem("user-data"));

         dispatch(login(data));

         setCred((prev) => ({ ...prev, name: data?.name, email: data?.email }));
         setPhoto((prev) => ({ ...prev, myFile: data?.photo }));
      }
   }, [user]); // eslint-disable-line

   const handleChange = (e) => {
      const { name, value } = e.target;

      setCred((prev) => ({ ...prev, [name]: value }));

      setFlag(false);
   };

   const handlePhotoUpload = async (e) => {
      const file = e.target.files[0];

      if (!file) {
         return;
      }

      const base64 = await convertToBase64(file);

      setPhoto((prev) => ({ ...prev, myFile: base64 }));

      setFlag(false);
   };

   const handleError = (data) => {
      data.map((error) => toast(error.msg, { type: "error" }));
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      setLoading(true);

      const data = await updateUser({
         user: {
            name: cred.name,
            currentPassword: cred.currentPassword,
            newPassword: cred.newPassword,
            photo: photo.myFile,
         },
         token: sessionStorage.getItem("auth-token"),
      });

      setLoading(false);

      if (!data.success) {
         handleError(data.errors);

         return;
      }

      dispatch(login(data.user));

      toast(data.msg, { type: "success" });

      sessionStorage.setItem("user-data", JSON.stringify(data.user));

      setCred((prev) => ({
         ...prev,
         name: data.user.name,
      }));

      setPhoto((prev) => ({ ...prev, myFile: data.user.photo }));

      setFlag(true);
   };

   return (
      <>
         <Navbar />
         <div className="container pt-20 pb-10 2xl:py-24 3xl:py-28 min-h-screen flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
            <div className="h-full flex-col items-start xl:pl-20">
               <div className="pb-10 lg:pb-28">
                  <h1 className="text-3xl text-center lg:text-4xl">
                     Edit you Profile
                  </h1>
               </div>

               <img
                  className="w-56 xl:w-96 rounded-[50%]"
                  src={
                     user && user?.photo && user?.photo?.length !== 0
                        ? user?.photo
                        : "/images/anonymous-user.webp"
                  }
                  alt=""
               />
            </div>
            <div className="xl:pr-32">
               <form className="space-y-4 w-80" onSubmit={handleSubmit}>
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
                        placeholder="Enter you Email"
                        disabled={true}
                     />
                  </div>

                  <div className="space-y-1">
                     <label className="ml-1">Current Password</label>
                     <input
                        className="w-full border border-gray-200 px-3 py-2 rounded-lg focus:outline-[#4dd1bd]"
                        type="password"
                        name="currentPassword"
                        value={cred.currentPassword}
                        onChange={handleChange}
                        placeholder="Enter your Password"
                        minLength={8}
                     />
                  </div>

                  <p className="w-fit h-1 ml-auto text-sm text-[#009c8d] hover:underline hover:underline-offset-2 cursor-pointer">
                     Forgot Password?
                  </p>

                  <div className="space-y-1">
                     <label className="ml-1">New Password</label>
                     <input
                        className="w-full border border-gray-200 px-3 py-2 rounded-lg focus:outline-[#4dd1bd]"
                        type="password"
                        name="newPassword"
                        value={cred.newPassword}
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
                  <button
                     disabled={flag ? true : false}
                     className={`${
                        flag
                           ? "bg-[#42aa9b]"
                           : "bg-[#009c84] hover:bg-[#42aa9b]"
                     } transition-all px-3 py-2 h-12 rounded-2xl w-full text-white font-semibold text-lg`}
                  >
                     {loading ? <Loader /> : "Update"}
                  </button>
               </form>
            </div>
         </div>
         <Footer />
      </>
   );
};

export default Profile;
