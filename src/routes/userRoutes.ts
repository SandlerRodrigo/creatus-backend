import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser, generateReport } from '../controllers/userController';
import authMiddleware from '../middleware/auth';

const router = Router();

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/report/csv', authMiddleware, generateReport);

export default router;