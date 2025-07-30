import express from "express";
import { createTask, deleteTask, getAllmyTasks, updateTask } from "../controllers/tasksController.js";
import { protectedRoute } from "../middlewares/protected.js";
const router = express.Router(); 

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 */

router.get('/', protectedRoute, getAllmyTasks)

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created
 */
router.post('/',protectedRoute, createTask)
router.put('/:id', protectedRoute,  updateTask)
router.delete('/:id',  protectedRoute,  deleteTask)







export default router;
