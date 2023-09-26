import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
   try {
      const token = req.body.token;

      if (!token) {
         return res.status(500).json({
            msg: "Auth token required!",
            error: error.message,
            success: false,
         });
      }

      const decoded_data = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded_data;
   } catch (error) {
      return res.status(500).json({
         msg: "Internal server error!",
         error: error.message,
         success: false,
      });
   }

   return next();
};
