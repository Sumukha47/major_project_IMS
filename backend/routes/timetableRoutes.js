import express from 'express';
import { createSlot, getTimetable, updateSlot, deleteSlot } from '../controllers/timetableController.js';

const router = express.Router();

router.post('/', createSlot);
router.get('/', getTimetable);
router.put('/:id', updateSlot);
router.delete('/:id', deleteSlot);

export default router;
