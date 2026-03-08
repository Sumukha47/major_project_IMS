import express from 'express';
import { createSubject, getSubjects, deleteSubject } from '../controllers/subjectController.js';

const router = express.Router();

router.post('/', createSubject);
router.get('/', getSubjects);
router.delete('/:id', deleteSubject);

export default router;
