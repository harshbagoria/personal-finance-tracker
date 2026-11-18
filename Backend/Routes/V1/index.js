import express from 'express';
import { Router } from 'express';
import authRoutes from './Auth.js';
import testRoutes from './TestRoute.js';
import transactionRoutes from './Transaction.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/test', testRoutes);
router.use('/transaction', transactionRoutes);

export default router;