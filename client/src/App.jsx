import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Error from "./components/Error";
import Register from "./components/Register";
import { GoogleOAuthProvider } from "@react-oauth/google";

const App = () => {
   const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

   return (
      <GoogleOAuthProvider clientId={clientId}>
         <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route path="*" element={<Error />} />
         </Routes>
      </GoogleOAuthProvider>
   );
};

export default App;
