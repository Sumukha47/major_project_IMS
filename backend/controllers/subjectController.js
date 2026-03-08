import Subject from '../models/Subject.js';
import { Op } from 'sequelize';

// Create New Subject
export const createSubject = async (req, res) => {
    try {
        const { name, code, department, semester, credits, description } = req.body;

        // Check for duplicate code
        const existingSubject = await Subject.findOne({ where: { code } });
        if (existingSubject) {
            return res.status(400).json({ message: 'Subject with this code already exists' });
        }

        const newSubject = await Subject.create({
            name,
            code,
            department,
            semester,
            credits,
            description
        });

        res.status(201).json({ message: 'Subject created successfully', subject: newSubject });
    } catch (error) {
        console.error('Error creating subject:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get All Subjects (with optional filters)
export const getSubjects = async (req, res) => {
    try {
        const { department, semester } = req.query;
        let whereClause = {};

        if (department && department !== 'All') whereClause.department = department;
        if (semester && semester !== 'All') whereClause.semester = semester;

        const subjects = await Subject.findAll({
            where: whereClause,
            order: [['semester', 'ASC'], ['name', 'ASC']]
        });

        res.json(subjects);
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Subject
export const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const subject = await Subject.findByPk(id);

        if (!subject) {
            return res.status(404).json({ message: 'Subject not found' });
        }

        await subject.destroy();
        res.json({ message: 'Subject deleted successfully' });
    } catch (error) {
        console.error('Error deleting subject:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
