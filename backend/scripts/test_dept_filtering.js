import sequelize from '../config/database.js';
import User from '../models/User.js';
import Student from '../models/Student.js';
import dotenv from 'dotenv';
dotenv.config();

const testStudentFilter = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB Connected');

        // Test Case 1: Filter by Department
        console.log('\n--- Testing Department Filter: "Computer Science" ---');
        let students = await Student.findAll({
            where: { department: 'Computer Science' },
            include: [{ model: User, attributes: ['name'] }]
        });
        console.log(`Found ${students.length} students in CS`);
        students.forEach(s => console.log(`- ${s.User?.name} (${s.year})`));

        // Test Case 2: Filter by Department AND Year
        console.log('\n--- Testing Dept + Year Filter: "Computer Science" + "3rd Year" ---');
        students = await Student.findAll({
            where: {
                department: 'Computer Science',
                year: '3rd Year'
            },
            include: [{ model: User, attributes: ['name'] }]
        });
        console.log(`Found ${students.length} 3rd Year CS students`);
        students.forEach(s => console.log(`- ${s.User?.name}`));

    } catch (err) {
        console.error(err);
    } finally {
        await sequelize.close();
    }
};

testStudentFilter();
