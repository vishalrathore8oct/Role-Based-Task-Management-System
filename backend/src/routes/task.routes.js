import express from 'express';
import { createTask, getTasks } from '../controllers/task.controllers.js';
import { authMiddleware } from '../middlewares/auth.middlewares.js';
import { roleMiddleware } from '../middlewares/role.middlewares.js';
const router = express.Router();

router.get('/getTask', authMiddleware,  getTasks);
router.post('/createTask', authMiddleware, roleMiddleware(["user"]),  createTask);

export default router;
