import express from "express";
import { login, register } from "../controllers/user.js";
import { protectedRoute } from "../middlewares/protected.js";
import { authorize } from "../middlewares/authorization.js";

const router = express.Router(); // use router instead of route for clarity

// POST /register route
router.post('/register', register);
router.post('/login', login)


// protected routes
router.get('/profile', protectedRoute, (req, res)=>{
    console.log(req.user)
   res.status(200).send(req.user || 'something went wrong')
})



// protected and authenticated route
router.get('/admin', protectedRoute, authorize('admin'), (req, res)=>{
   res.status(200).json("welcome to your admin dashboard")
})



export default router;
