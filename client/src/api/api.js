import axios from "axios";

const url = import.meta.env.VITE_SERVER_URL;

export const registerUser = async (data) => {
   try {
      const response = await axios.post(`${url}/api/auth/registerUser`, data);

      return response.data;
   } catch (error) {
      console.log("Error in register API", error);
   }
};

export const loginUser = async (data) => {
   try {
      const response = await axios.post(`${url}/api/auth/loginUser`, data);

      return response.data;
   } catch (error) {
      console.log("Error in loginUser API", error);
   }
};

export const googleAuth = async (data) => {
   try {
      const response = await axios.post(`${url}/api/auth/googleAuthUser`, data);

      return response.data;
   } catch (error) {
      console.log("Error in googleAuth API", error);
   }
};

export const updateUser = async (data) => {
   try {
      const response = await axios.put(`${url}/api/auth/updateUser`, data);

      return response.data;
   } catch (error) {
      console.log("Error in updateUser API", error);
   }
};

export const getNotes = async (data) => {
   try {
      const response = await axios.post(`${url}/api/notes/getNotes`, data);

      return response.data;
   } catch (error) {
      console.log("Error in getNotes API", error);
   }
};

export const addNote = async (data) => {
   try {
      const response = await axios.post(`${url}/api/notes/addNote`, data);

      return response.data;
   } catch (error) {
      console.log("Error in addNote API", error);
   }
};

export const updateNote = async (data) => {
   try {
      const response = await axios.put(`${url}/api/notes/updateNote`, data);

      return response.data;
   } catch (error) {
      console.log("Error in updateNote API", error);
   }
};

export const deleteNote = async (data) => {
   try {
      const response = await axios.post(`${url}/api/notes/deleteNote`, data);

      return response.data;
   } catch (error) {
      console.log("Error in deleteNote API", error);
   }
};
