import Department from '../models/Department.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';

// Get All Departments with Counts
export const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.findAll({
            order: [['name', 'ASC']]
        });

        // Calculate counts dynamically (or could use Sequelize.fn with GROUP BY for efficiency, 
        // but explicit query loops are safer for consistency with current string-based matching)
        const departmentsWithCounts = await Promise.all(departments.map(async (dept) => {
            const studentCount = await Student.count({ where: { department: dept.name } });
            const teacherCount = await Teacher.count({ where: { department: dept.name } });

            return {
                ...dept.toJSON(),
                students: studentCount,
                faculty: teacherCount
            };
        }));

        res.json(departmentsWithCounts);
    } catch (error) {
        console.error('Error fetching departments:', error);
        res.status(500).json({ message: 'Server error fetching departments' });
    }
};

// Create Department
export const createDepartment = async (req, res) => {
    try {
        const { name, hod, description } = req.body;

        const existing = await Department.findOne({ where: { name } });
        if (existing) {
            return res.status(400).json({ message: 'Department already exists' });
        }

        const newDept = await Department.create({
            name,
            hod,
            description
        });

        res.status(201).json(newDept);
    } catch (error) {
        console.error('Error creating department:', error);
        res.status(500).json({ message: 'Server error creating department' });
    }
};
