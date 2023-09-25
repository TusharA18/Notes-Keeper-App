import { validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
   const errors = validationResult(req);

   let success = false;

   if (!errors.isEmpty()) {
      return res.status(200).json({
         success,
         errors: errors.array(),
      });
   }

   try {
      const { name, email, password, photo } = req.body;

      const hashPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
         name,
         email,
         photo,
         password: hashPassword,
      });

      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      return res.status(200).json({
         msg: "User registered successfully",
         user: {
            name: newUser.name,
            email: newUser.email,
            date: newUser.date,
            photo: newUser.photo,
         },
         success: true,
         token,
      });
   } catch (error) {
      return res.status(500).json({
         msg: "Internal server error!",
         error: error.message,
         success: false,
      });
   }
};

export const loginUser = async (req, res) => {
   const errors = validationResult(req);

   let success = false;

   if (!errors.isEmpty()) {
      return res.status(200).json({
         success,
         errors: errors.array(),
      });
   }

   try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
         return res.status(200).json({
            errors: [{ msg: "Invalid Credentials" }],
            success: false,
         });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
         return res.status(200).json({
            errors: [{ msg: "Invalid Credentials" }],
            success: false,
         });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      return res.status(200).json({
         msg: "User logged in successfully",
         user: {
            name: user.name,
            email: user.email,
            date: user.date,
            photo: user.photo,
         },
         success: true,
         token,
      });
   } catch (error) {
      return res.status(500).json({
         msg: "Internal server error!",
         error: error.message,
         success: false,
      });
   }
};

export const googleAuth = async (req, res) => {
   const errors = validationResult(req);

   let success = false;

   if (!errors.isEmpty()) {
      return res.status(200).json({
         success,
         errors: errors.array(),
      });
   }

   try {
      const { name, email, sub, photo } = req.body;

      const user = await User.findOne({ sub });

      let token;

      if (user) {
         token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

         return res.status(200).json({
            msg: "User login successfully",
            user: {
               name: user.name,
               email: user.email,
               date: user.date,
               photo: user.photo,
            },
            success: true,
            token,
         });
      }

      const newUser = await User.create({
         name,
         email,
         photo,
         sub,
      });

      await newUser.save();

      token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      return res.status(200).json({
         msg: "User registered successfully",
         user: {
            name: newUser.name,
            email: newUser.email,
            date: newUser.date,
            photo: newUser.photo,
         },
         success: true,
         token,
      });
   } catch (error) {
      return res.status(500).json({
         msg: "Internal server error!",
         error: error.message,
         success: false,
      });
   }
};
