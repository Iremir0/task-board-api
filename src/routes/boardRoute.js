import express from 'express';
import {createBoard, getBoards, getBoardById, updateBoard, deleteBoard, addCollaborator,getTasks, createTask} from '../controllers/boardController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import checkBoardAccess from '../middleware/checkBoardAccess.js';
import checkBoardAndOwnership from '../middleware/checkBoardAndOwnership.js';
import { validateRequest } from '../middleware/validateRequest.js';
import {createBoardSchema,updateBoardSchema,addCollaboratorSchema} from '../validators/boardValidator.js'
import { createTaskSchema } from '../validators/taskValidators.js';

const router = express.Router()

router.post('/', authMiddleware, validateRequest(createBoardSchema), createBoard);
router.get('/', authMiddleware, getBoards);
router.get('/:id', authMiddleware, checkBoardAccess, getBoardById);
router.patch('/:id', authMiddleware, checkBoardAndOwnership, validateRequest(updateBoardSchema), updateBoard);
router.delete('/:id', authMiddleware, checkBoardAndOwnership, deleteBoard);
router.post('/:id/collaborators', authMiddleware, checkBoardAndOwnership, validateRequest(addCollaboratorSchema), addCollaborator);
router.get('/:id/tasks', authMiddleware, checkBoardAccess, getTasks);
router.post('/:id/tasks', authMiddleware, checkBoardAndOwnership, validateRequest(createTaskSchema), createTask);

export default router
