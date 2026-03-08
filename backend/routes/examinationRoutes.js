import express from 'express';
import {
    createExam,
    getExams,
    inputMarks,
    getMyResults,
    getStudentResults,
    updateExamStatus,
    getMarksByFilter
} from '../controllers/examinationController.js';
import { protect, admin, teacher } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all exams and personal results (Protected)
router.get('/', protect, getExams);
router.get('/my-results', protect, getMyResults);

// Create examination and Update Status (Admin only)
router.post('/', protect, admin, createExam);
router.put('/:id/status', protect, admin, updateExamStatus);

// Bulk marks entry (Teacher or Admin)
router.post('/marks', protect, teacher, inputMarks);
router.get('/marks', protect, teacher, getMarksByFilter);

// Specific student results (Admin/Teacher view)
router.get('/student-results', protect, teacher, getStudentResults);

export default router;
