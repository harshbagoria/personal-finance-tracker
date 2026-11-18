import { Router } from 'express';
import { addTransaction } from '../../Controller/TransactionController.js';
import authMiddleware from '../../Middleware/authMiddleware.js';

const router = Router();
 
router.post('/add', authMiddleware, addTransaction);

export default router;
