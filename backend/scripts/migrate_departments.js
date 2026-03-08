import sequelize from '../config/database.js';
import Student from '../models/Student.js';
import Teacher from '../models/Teacher.js';
import Department from '../models/Department.js';
import dotenv from 'dotenv';
dotenv.config();

const migrateDepartments = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB Connected');

        // Mapping Old ID -> New Canonical Name
        const mapping = {
            'Information Tech': 'Information Technology',
            'Electronics': 'Electronics & Comm.',
            'Electrical': 'Electrical Engg.',
            'Mechanical': 'Mechanical Engg.',
            'Civil': 'Civil Engineering',
            // 'Computer Science' is already 'Computer Science' in both, so usually fine, 
            // but if "Computer Science & Engineering" was stored, map it too.
            'Computer Science & Engineering': 'Computer Science'
        };

        const students = await Student.findAll();
        for (const s of students) {
            if (mapping[s.department]) {
                const old = s.department;
                s.department = mapping[old];
                await s.save();
                console.log(`Updated Student ${s.enrollmentNo}: ${old} -> ${s.department}`);
            }
        }

        const teachers = await Teacher.findAll();
        for (const t of teachers) {
            if (mapping[t.department]) {
                const old = t.department;
                t.department = mapping[old];
                await t.save();
                console.log(`Updated Teacher ${t.employeeId}: ${old} -> ${t.department}`);
            }
        }

        console.log('Migration Complete');

    } catch (err) {
        console.error(err);
    } finally {
        await sequelize.close();
    }
};

migrateDepartments();
