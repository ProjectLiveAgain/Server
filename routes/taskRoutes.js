import express from 'express';
const router = express.Router();

import auth from '../middleware/authMiddleware.js';
import { createTask, getTasks, getTask, updateTask, deleteTask, getStats, statusUpdate, testing } from '../controllers/taskController.js';

// Protected task routes
router.use(auth);

router.post('/', createTask);
router.get('/', getTasks);
router.get('/stats', getStats);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.put('/api/tasks/:id',statusUpdate)
router.get("/testing",testing)

export default router;
