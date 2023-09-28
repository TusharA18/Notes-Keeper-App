import { validationResult } from "express-validator";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(200).json({
         success: false,
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

   if (!errors.isEmpty()) {
      return res.status(200).json({
         success: false,
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

export const googleAuthUser = async (req, res) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(200).json({
         success: false,
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
            msg: "User logged in successfully",
            user: {
               name: user.name,
               email: user.email,
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

export const updateUser = async (req, res) => {
   try {
      const { name, currentPassword, newPassword, photo } = req.body.user;

      const id = req.user.id;

      const user = await User.findById(id);

      if (!user) {
         return res.status(200).json({
            errors: [{ msg: "No user available with these credentials" }],
            success: false,
         });
      }

      let newData = {};

      newData.updatedAt = Date.now();

      if (name) {
         newData.name = name;
      }

      if (photo) {
         newData.photo = photo;
      }

      if (currentPassword) {
         if (user.sub) {
            return res.status(200).json({
               errors: [
                  {
                     msg: "The password can't be updated as you logged in or registered through Google",
                  },
               ],
               success: false,
            });
         }

         const match = await bcrypt.compare(currentPassword, user.password);

         if (!match) {
            return res.status(200).json({
               errors: [{ msg: "Password doesn't matched" }],
               success: false,
            });
         }

         let pattern = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
         );

         if (
            !newPassword ||
            newPassword.length < 8 ||
            !pattern.test(newPassword)
         ) {
            return res.status(200).json({
               errors: [{ msg: "Password doesn't follow the valid criteria" }],
               success: false,
            });
         }

         const hashPassword = await bcrypt.hash(newPassword, 10);

         newData.password = hashPassword;
      }

      const updatedUser = await User.findByIdAndUpdate(
         { _id: id },
         { $set: newData },
         { new: true }
      );

      return res.status(200).json({
         msg: "User profile updated successfully",
         user: {
            name: updatedUser.name,
            email: updatedUser.email,
            photo: updatedUser.photo,
            password: updatedUser.password,
         },
         success: true,
      });
   } catch (error) {
      return res.status(500).json({
         msg: "Internal server error!",
         error: error.message,
         success: false,
      });
   }
};
