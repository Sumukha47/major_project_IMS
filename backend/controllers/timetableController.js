import Timetable from '../models/Timetable.js';
import Department from '../models/Department.js';
import Subject from '../models/Subject.js';
import Teacher from '../models/Teacher.js';
import User from '../models/User.js';

// Create Timetable Slot
export const createSlot = async (req, res) => {
    try {
        const { departmentId, year, semester, section, day, startTime, endTime, subjectId, teacherId, room, type } = req.body;

        if (!departmentId || !year || !semester || !section || !day || !startTime || !endTime || !subjectId || !teacherId || !room) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check for class conflicts (same class, same time)
        const classConflict = await Timetable.findOne({
            where: { departmentId, year, semester, section, day, startTime }
        });

        if (classConflict) {
            return res.status(400).json({ message: 'Time slot already occupied for this class' });
        }

        // Check teacher availability (same teacher, same time)
        const teacherConflict = await Timetable.findOne({
            where: { teacherId, day, startTime }
        });

        if (teacherConflict) {
            return res.status(400).json({ message: 'Teacher is already scheduled at this time' });
        }

        const newSlot = await Timetable.create({
            departmentId, year, semester, section, day, startTime, endTime,
            subjectId, teacherId, room, type: type || 'Lecture'
        });

        res.status(201).json({ message: 'Slot created successfully', slot: newSlot });
    } catch (error) {
        console.error('Error creating slot:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get Timetable with Filters
export const getTimetable = async (req, res) => {
    try {
        const { departmentId, year, semester, section, day, teacherId } = req.query;
        let whereClause = {};

        if (departmentId) whereClause.departmentId = departmentId;
        if (year) whereClause.year = parseInt(year);
        if (semester) whereClause.semester = parseInt(semester);
        if (section) whereClause.section = section;
        if (day) whereClause.day = day;
        if (teacherId) whereClause.teacherId = teacherId;

        const timetable = await Timetable.findAll({
            where: whereClause,
            include: [
                { model: Department, as: 'department', attributes: ['id', 'name'] },
                { model: Subject, as: 'subject', attributes: ['id', 'name', 'code'] },
                {
                    model: Teacher,
                    as: 'teacher',
                    attributes: ['id'],
                    include: [{ model: User, attributes: ['id', 'name', 'email'] }]
                }
            ],
            order: [['day', 'ASC'], ['startTime', 'ASC']]
        });

        res.json(timetable);
    } catch (error) {
        console.error('Error fetching timetable:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Update Slot
export const updateSlot = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const slot = await Timetable.findByPk(id);
        if (!slot) {
            return res.status(404).json({ message: 'Slot not found' });
        }

        await slot.update(updates);
        res.json({ message: 'Slot updated successfully', slot });
    } catch (error) {
        console.error('Error updating slot:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Delete Slot
export const deleteSlot = async (req, res) => {
    try {
        const { id } = req.params;

        const slot = await Timetable.findByPk(id);
        if (!slot) {
            return res.status(404).json({ message: 'Slot not found' });
        }

        await slot.destroy();
        res.json({ message: 'Slot deleted successfully' });
    } catch (error) {
        console.error('Error deleting slot:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
