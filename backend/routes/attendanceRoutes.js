import express from 'express';
import {
    markAttendance,
    getAttendanceRecords,
    getAttendanceStats,
    getMonthlySummary,
    updateAttendanceRecord
} from '../controllers/attendanceController.js';
import { protect, teacher, canCorrect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Bulk mark/update attendance (Restricted to Teachers/Admins)
router.post('/', protect, teacher, markAttendance);

// Get attendance records with student-context-awareness
router.get('/', protect, getAttendanceRecords);

// Get monthly summary (Reports)
router.get('/summary', protect, getMonthlySummary);

// Get stats for a specific student (Aggregated)
router.get('/stats/:studentId', protect, getAttendanceStats);

// Manual correction of a specific record (Admin/HOD only)
router.put('/:id', protect, canCorrect, updateAttendanceRecord);

export default router;
