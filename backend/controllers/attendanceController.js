import Attendance from '../models/Attendance.js';
import User from '../models/User.js';
import sequelize from '../config/database.js';
import { Op } from 'sequelize';

// Mark Bulk Attendance (with Upsert logic to handle duplicates)
export const markAttendance = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { records, date, subject, class: className } = req.body;

        if (!records || !Array.isArray(records)) {
            return res.status(400).json({ message: 'Invalid records format' });
        }

        const attendanceData = records.map(record => ({
            studentId: record.studentId,
            date: date || new Date().toISOString().split('T')[0],
            status: record.status,
            subject: subject || 'General',
            class: className || 'N/A'
        }));

        // bulkCreate with updateOnDuplicate ensures if a record for [studentId, date, subject, class] exists, it updates it
        await Attendance.bulkCreate(attendanceData, {
            updateOnDuplicate: ['status', 'updatedAt'],
            transaction: t
        });

        await t.commit();
        res.status(201).json({ message: 'Attendance marked/updated successfully' });
    } catch (error) {
        await t.rollback();
        console.error('Error marking attendance:', error);
        res.status(500).json({ message: 'Server error marking attendance', error: error.message });
    }
};

// Update Single Record (Manual Correction - Admin/HOD)
export const updateAttendanceRecord = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const record = await Attendance.findByPk(id);
        if (!record) return res.status(404).json({ message: 'Record not found' });

        record.status = status;
        await record.save();

        res.json({ message: 'Attendance record corrected successfully', record });
    } catch (error) {
        console.error('Error correcting attendance:', error);
        res.status(500).json({ message: 'Server error correcting record' });
    }
};

// Get Attendance Records with filters
export const getAttendanceRecords = async (req, res) => {
    try {
        const { date, class: className, studentId, subject } = req.query;
        let whereClause = {};

        // Security: Students can only fetch their own records
        if (req.user.role === 'student' || req.user.role === 'Student') {
            whereClause.studentId = req.user.id;
        } else if (studentId && studentId !== 'undefined') {
            whereClause.studentId = studentId;
        } else if (req.user.role !== 'admin' && req.user.role !== 'Admin') {
            // If not admin and no studentId provided/valid, default to self
            whereClause.studentId = req.user.id;
        }

        if (date) whereClause.date = date;
        if (className) whereClause.class = className;
        if (subject) whereClause.subject = subject;

        const records = await Attendance.findAll({
            where: whereClause,
            include: [{
                model: User,
                as: 'student',
                attributes: ['name', 'email']
            }],
            order: [['date', 'DESC']]
        });

        res.json(records);
    } catch (error) {
        console.error('Error fetching attendance:', error);
        res.status(500).json({ message: 'Server error fetching attendance' });
    }
};

// Get Monthly Summary
export const getMonthlySummary = async (req, res) => {
    try {
        const { studentId, month, year } = req.query;
        const targetStudent = (req.user.role === 'student' || req.user.role === 'Student') ? req.user.id : studentId;

        console.log(`[DEBUG] getMonthlySummary: targetStudent=${targetStudent}, month=${month}, year=${year}`);

        if (!targetStudent || targetStudent === 'undefined' || targetStudent === 'null' || targetStudent === '') {
            console.warn(`[WARN] getMonthlySummary: Blocked invalid studentId: ${targetStudent}`);
            return res.status(400).json({ message: 'Valid Student ID required' });
        }

        if (!month || !year || month === 'undefined' || year === 'undefined') {
            console.warn(`[WARN] getMonthlySummary: Blocked invalid date parameters: month=${month}, year=${year}`);
            return res.status(400).json({ message: 'Valid month and year are required' });
        }

        const startDate = `${year}-${month}-01`;
        const endDate = new Date(year, month, 0).toISOString().split('T')[0];

        const records = await Attendance.findAll({
            where: {
                studentId: targetStudent,
                date: {
                    [Op.between]: [startDate, endDate]
                }
            },
            attributes: ['date', 'status', 'subject'],
            order: [['date', 'ASC']]
        });

        res.json(records);
    } catch (error) {
        console.error('Error fetching monthly summary:', error);
        res.status(500).json({ message: 'Server error fetching summary' });
    }
};

// Get Stats for a student
export const getAttendanceStats = async (req, res) => {
    try {
        const studentId = (req.user.role === 'student' || req.user.role === 'Student') ? req.user.id : req.params.studentId;

        console.log(`[DEBUG] getAttendanceStats: studentId=${studentId}`);

        if (!studentId || studentId === 'undefined' || studentId === 'null' || studentId === '') {
            console.warn(`[WARN] getAttendanceStats: Blocked invalid studentId: ${studentId}`);
            return res.status(400).json({ message: 'Valid Student ID required for stats' });
        }

        const total = await Attendance.count({ where: { studentId } });
        const present = await Attendance.count({ where: { studentId, status: 'Present' } });
        const late = await Attendance.count({ where: { studentId, status: 'Late' } });

        const percentage = total === 0 ? 0 : Math.round(((present + late) / total) * 100);

        res.json({
            total,
            present,
            late,
            absent: total - present - late,
            percentage
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: 'Server error fetching attendance statistics' });
    }
};
