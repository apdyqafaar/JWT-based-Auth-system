import express from "express";
import { login, register } from "../controllers/user.js";

const router = express.Router(); // use router instead of route for clarity

// POST /register route
router.post('/register', register);
router.post('/login', login)

export default router;
