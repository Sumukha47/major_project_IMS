import express from 'express';
import {
    createFeeStructure, getFeeStructures,
    inputPayment, getMyFees,
    getFeeStats, getDefaulters,
    createDiscount, getDiscounts
} from '../controllers/feeController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Fee Structure Routes
router.post('/structures', protect, admin, createFeeStructure);
router.get('/structures', protect, getFeeStructures);

// Payment Routes
router.post('/payments', protect, inputPayment); // Both admin and student can record (mock)
router.get('/my-fees', protect, getMyFees);
router.get('/stats', protect, admin, getFeeStats);
router.get('/defaulters', protect, admin, getDefaulters);

// Discount Routes
router.post('/discounts', protect, admin, createDiscount);
router.get('/discounts', protect, getDiscounts);

export default router;
