import Exam from '../models/Exam.js';
import Mark from '../models/Mark.js';
import User from '../models/User.js';
import Subject from '../models/Subject.js';
import sequelize from '../config/database.js';
import { Op } from 'sequelize';

// Helper to calculate Grade
const calculateGrade = (obtained, max) => {
    const percentage = (obtained / max) * 100;
    if (percentage >= 90) return 'O';
    if (percentage >= 80) return 'A+';
    if (percentage >= 70) return 'A';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
};

// Create a new Examination Cycle (Admin Only)
export const createExam = async (req, res) => {
    try {
        const { name, term, academicYear, startDate, endDate } = req.body;
        const exam = await Exam.create({ name, term, academicYear, startDate, endDate });
        res.status(201).json({ message: 'Examination cycle created successfully', exam });
    } catch (error) {
        console.error('Error creating exam:', error);
        res.status(500).json({ message: 'Server error creating exam', error: error.message });
    }
};

// Get all Examination Cycles
export const getExams = async (req, res) => {
    try {
        const exams = await Exam.findAll({ order: [['createdAt', 'DESC']] });
        res.json(exams);
    } catch (error) {
        console.error('Error fetching exams:', error);
        res.status(500).json({ message: 'Server error fetching exams' });
    }
};

// Bulk input Marks (Teacher Only)
export const inputMarks = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { examId, subjectId, marksData } = req.body;

        if (!marksData || !Array.isArray(marksData)) {
            return res.status(400).json({ message: 'Invalid marks data format' });
        }

        const marksToInsert = marksData.map(item => ({
            examId,
            subjectId,
            studentId: item.studentId,
            obtainedMarks: item.obtained,
            maxMarks: item.maxMarks || 100,
            grade: calculateGrade(item.obtained, item.maxMarks || 100),
            remarks: item.remarks || ''
        }));

        // bulkCreate with updateOnDuplicate to handle updates
        await Mark.bulkCreate(marksToInsert, {
            updateOnDuplicate: ['obtainedMarks', 'grade', 'remarks', 'updatedAt'],
            transaction: t
        });

        await t.commit();
        res.status(201).json({ message: 'Marks recorded/updated successfully' });
    } catch (error) {
        await t.rollback();
        console.error('Error recording marks:', error);
        res.status(500).json({ message: 'Server error recording marks', error: error.message });
    }
};

// Get Results for Logged-in Student
export const getMyResults = async (req, res) => {
    try {
        const { examId } = req.query;
        let whereClause = { studentId: req.user.id };

        if (examId) whereClause.examId = examId;

        const results = await Mark.findAll({
            where: whereClause,
            include: [
                { model: Exam, as: 'exam', attributes: ['name', 'term', 'academicYear', 'status'] },
                { model: Subject, as: 'subject', attributes: ['name', 'code', 'credits'] }
            ],
            order: [[{ model: Exam, as: 'exam' }, 'createdAt', 'DESC']]
        });

        // Filter out marks where exam is still in 'Draft' status (except for teachers/admins view, but this is getMyResults)
        const visibleResults = results.filter(r => r.exam.status === 'Published');

        res.json(visibleResults);
    } catch (error) {
        console.error('Error fetching results:', error);
        res.status(500).json({ message: 'Server error fetching results' });
    }
};

// Get Results for a specific student (Admin/Teacher view)
export const getStudentResults = async (req, res) => {
    try {
        const { studentId, examId } = req.query;
        if (!studentId) return res.status(400).json({ message: 'Student ID is required' });

        const whereClause = { studentId };
        if (examId) whereClause.examId = examId;

        const results = await Mark.findAll({
            where: whereClause,
            include: [
                { model: Exam, as: 'exam' },
                { model: Subject, as: 'subject' }
            ]
        });

        res.json(results);
    } catch (error) {
        console.error('Error fetching student results:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Publish Exam Results (Admin only)
export const updateExamStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await Exam.update({ status }, { where: { id } });
        res.json({ message: `Examination status updated to ${status}` });
    } catch (error) {
        console.error('Error updating exam status:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Fetch marks for a class/exam/subject (Teacher flow)
export const getMarksByFilter = async (req, res) => {
    try {
        const { examId, subjectId, department, year, semester } = req.query;

        if (!examId || !subjectId) {
            return res.status(400).json({ message: 'Exam and Subject IDs are required' });
        }

        const marks = await Mark.findAll({
            where: { examId, subjectId },
            include: [
                {
                    model: User,
                    as: 'student',
                    attributes: ['id', 'name', 'avatar'],
                    include: [{
                        model: sequelize.models.Student,
                        as: 'studentProfile',
                        where: {
                            ...(department && { department }),
                            ...(year && { year }),
                            ...(semester && { semester })
                        },
                        attributes: ['enrollmentNo', 'section']
                    }]
                }
            ]
        });

        res.json(marks);
    } catch (error) {
        console.error('Error fetching marks by filter:', error);
        res.status(500).json({ message: 'Server error fetching marks' });
    }
};

