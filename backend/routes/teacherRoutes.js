import express from 'express';
import Teacher from '../models/Teacher.js';
import User from '../models/User.js';

const router = express.Router();

// Get all teachers with user data
router.get('/', async (req, res) => {
    try {
        const teachers = await Teacher.findAll({
            include: [{
                model: User,
                attributes: ['id', 'name', 'email', 'phone']
            }],
            attributes: ['id', 'employeeId', 'department', 'userId']
        });

        res.json(teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
