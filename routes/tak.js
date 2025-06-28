import express from "express";
import { createTask, deleteTask, getAllmyTasks, updateTask } from "../controllers/tasksController.js";
import { protectedRoute } from "../middlewares/protected.js";
const router = express.Router(); 


router.get('/', protectedRoute, getAllmyTasks)
router.post('/', protectedRoute, createTask)
router.put('/:id', protectedRoute, updateTask)
router.delete('/:id', protectedRoute, deleteTask)







export default router;
