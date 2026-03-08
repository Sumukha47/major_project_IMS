import User from '../models/User.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import Department from '../models/Department.js';

export const getDashboardStats = async (req, res) => {
    try {
        const studentCount = await Student.count();
        const teacherCount = await Teacher.count();
        const departmentCount = await Department.count();

        // For now, these are placeholders or could be calculated if models exist
        const activeRequests = 0;
        const avgAttendance = 0;

        res.json({
            studentCount,
            teacherCount,
            departmentCount,
            activeRequests,
            avgAttendance
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ message: 'Server error fetching dashboard stats' });
    }
};
