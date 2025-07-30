import swaggerJSDoc from "swagger-jsdoc"
import User from "../models/user.js"
import { generateToken } from "../utils/generateToken.js"

 export const register=async(req, res, next)=>{
      
    let {name, email, password, role}=req.body

    try {
        email=email.toLowerCase()
        const exsistingUser=await User.findOne({email})
        if(exsistingUser) return res.status(400).json('email already in use')

        const Newuser= await User.create({email, password, name, role})
        const token=generateToken(Newuser._id)
        res.status(201).json(token)
    } catch (error) {
        next(error)
    }
 }


 export const login=async (req, res, next)=>{

  let {email, password}=req.body
    try {
        email=email.toLowerCase()
        const user=await User.findOne({email})
        
         if(!user || !(await user.comparedPassword(password))){
            return res.status(401).json("invalid credintials, Email or Password")
         }

         const token=generateToken(user._id)
         res.status(201).json({token, user})

    } catch (error) {
        next(error)
    }
  
 }

 export const getUsers=async(req, res, next)=>{
    try {
        const allUsers=await User.find()
        res.status(201).json(allUsers)
    } catch (error) {
        next(error)
    }
 }