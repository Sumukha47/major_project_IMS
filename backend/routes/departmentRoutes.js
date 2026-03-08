import express from 'express';
import { getAllDepartments, createDepartment } from '../controllers/departmentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getAllDepartments); // All authenticated users can view
router.post('/', protect, admin, createDepartment); // Only admin can create

export default router;
