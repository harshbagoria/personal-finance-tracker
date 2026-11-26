import { Router } from 'express';
import { addTransaction  , getTransactions} from '../../Controller/TransactionController.js';
import authMiddleware from '../../Middleware/authMiddleware.js';

const router = Router();
 
router.post('/add', authMiddleware, addTransaction);
router.get('/get', authMiddleware, getTransactions);


export default router;
