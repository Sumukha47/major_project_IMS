import express from 'express';
import { createRequest, getMyRequests, getAllRequests, updateRequestStatus, deleteRequest } from '../controllers/requestController.js';

const router = express.Router();

router.post('/', createRequest);
router.get('/my', getMyRequests);
router.get('/', getAllRequests);
router.put('/:id', updateRequestStatus);
router.delete('/:id', deleteRequest);

export default router;
