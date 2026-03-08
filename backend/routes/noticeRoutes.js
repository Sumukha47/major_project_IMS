import express from 'express';
import { createNotice, getAllNotices, deleteNotice, updateNotice } from '../controllers/noticeController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Publicly readable (or protected based on preference, let's protect all for now)
router.get('/', protect, getAllNotices);

// Admin/Teacher only (ideally) - for now just protected
router.post('/', protect, createNotice);
router.put('/:id', protect, updateNotice);
router.delete('/:id', protect, deleteNotice);

export default router;
