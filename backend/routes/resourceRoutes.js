import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';
import {
    uploadResource,
    getTeacherResources,
    getStudentResources,
    updateResource,
    deleteResource,
    downloadResource
} from '../controllers/resourceController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Teacher routes
router.post('/upload', upload.single('file'), uploadResource);
router.get('/teacher', getTeacherResources);
router.put('/:id', updateResource);
router.delete('/:id', deleteResource);

// Student routes
router.get('/student', getStudentResources);

// Common routes
router.get('/:id/download', downloadResource);

export default router;
