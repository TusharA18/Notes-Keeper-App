import express from "express";
import {
   googleAuth,
   loginUser,
   registerUser,
} from "../controllers/auth-controller.js";
import { body } from "express-validator";
import User from "../models/User.js";

const router = express.Router();

router.post(
   "/register",
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
         .withMessage("Password is not valid"),
   ],
   registerUser
);

router.post(
   "/login",
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
   "/googleAuth",
   [
      body("name").notEmpty().withMessage("Name cannot be empty"),
      body("email")
         .notEmpty()
         .withMessage("Email cannot be empty")
         .isEmail()
         .withMessage("Email is not valid"),
      body("sub").notEmpty().withMessage("Credentials invalid"),
   ],
   googleAuth
);

export default router;
