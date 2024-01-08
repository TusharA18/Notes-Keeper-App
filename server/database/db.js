import mongoose from "mongoose";

const connectToDB = () => {
   const url = process.env.MONGO_URL;

   const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   };

   try {
      mongoose.connect(url, options).then(() => console.log("DB connected"));
   } catch (error) {
      console.log("Error while connecting to DB");
   }
};

export default connectToDB;
