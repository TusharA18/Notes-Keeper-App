import axios from "axios";

const url = import.meta.env.VITE_SERVER_URL;

export const registerUser = async (data) => {
   try {
      const response = await axios.post(`${url}/api/auth/register`, data);

      return response.data;
   } catch (error) {
      console.log("Error in register API", error);
   }
};

export const loginUser = async (data) => {
   try {
      const response = await axios.post(`${url}/api/auth/login`, data);

      return response.data;
   } catch (error) {
      console.log("Error in loginUser API", error);
   }
};

export const googleAuth = async (data) => {
   try {
      const response = await axios.post(`${url}/api/auth/googleAuth`, data);

      return response.data;
   } catch (error) {
      console.log("Error in googleAuth API", error);
   }
};
