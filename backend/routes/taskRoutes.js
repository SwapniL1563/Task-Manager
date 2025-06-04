import express from 'express'
import { createTask, deleteTask, getTask, updateTask } from '../controller/taskController.js';
import { authMiddleware } from '../middleware/authMiddleware.js'; 

const router = express.Router();

router.get("/gettask",authMiddleware,getTask);
router.post("/createtask",authMiddleware,createTask);
router.put("/updatetask/:id",authMiddleware,updateTask);
router.delete("/deletetask/:id",authMiddleware,deleteTask);

export default router;