  import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protectedRoute=async (req, res, next)=>{
        const token=req.headers.authorization?.split(" ")[1]
       
        if(!token) res.status(401).json('no token provided')


            try {
                const decode=jwt.verify(token, process.env.JWT_SECRET)
                 console.log(decode)
                req.user= await User.findById(decode.user_id).select("-password")

                next()
            } catch (error) {
                next(error)
            }
  }