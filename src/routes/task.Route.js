import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js';
import {deleteTask, getTask, updateTask } from '../controllers/taskController.js';
import checkTaskAccess from '../middleware/checkTaskAccess.js';
import checkTaskOwnership from '../middleware/checkTaskOwnership.js'
import { validateRequest } from '../middleware/validateRequest.js';
import { createTaskSchema, updateTaskSchema } from '../validators/taskValidators.js';

const router = express.Router();

router.get('/:id',authMiddleware,checkTaskAccess,getTask);
router.patch('/:id',authMiddleware,checkTaskOwnership,validateRequest(updateTaskSchema),updateTask)
router.delete('/:id', authMiddleware,checkTaskOwnership,deleteTask);

export default router;