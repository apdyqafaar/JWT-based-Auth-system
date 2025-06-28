import express from "express";
import { protectedRoute } from "../middlewares/protected.js";
import { uploadFile } from "../controllers/uploadController.js";
import { upload } from "../middlewares/uploud.js";

const router = express.Router(); 

router.post('/profile-picture', protectedRoute,upload.single('file'), uploadFile)

export default router