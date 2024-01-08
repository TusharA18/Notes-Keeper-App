import express from "express";
import {
   googleAuthUser,
   loginUser,
   registerUser,
   updateUser,
} from "../controllers/auth-controller.js";
import { body } from "express-validator";
import User from "../models/User.js";
import { verifyToken } from "../middleware/auth-middleware.js";

const router = express.Router();

router.post(
   "/registerUser",
   [
      body("name").notEmpty().withMessage("Name cannot be empty"),
      body("email")
         .notEmpty()
         .withMessage("Email cannot be empty")
         .isEmail()
         .withMessage("Email is not valid")
         .custom(async (value) => {
            const user = await User.find({ email: value });

            if (user.length > 0) {
               throw new Error("Email already in use");
            }
         }),
      body("password")
         .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
         })
         .withMessage("Password doesn't follow the valid criteria"),
   ],
   registerUser
);

router.post(
   "/loginUser",
   [
      body("email")
         .notEmpty()
         .withMessage("Email cannot be empty")
         .isEmail()
         .withMessage("Email is not valid"),
      body("password").notEmpty().withMessage("Password is not valid"),
   ],
   loginUser
);

router.post(
   "/googleAuthUser",
   [
      body("name").notEmpty().withMessage("Name cannot be empty"),
      body("email")
         .notEmpty()
         .withMessage("Email cannot be empty")
         .isEmail()
         .withMessage("Email is not valid"),
      body("sub").notEmpty().withMessage("Credentials invalid"),
   ],
   googleAuthUser
);

router.put("/updateUser", verifyToken, updateUser);

export default router;
