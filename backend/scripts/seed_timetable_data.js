import sequelize from '../config/database.js';
import Department from '../models/Department.js';
import Subject from '../models/Subject.js';
import Teacher from '../models/Teacher.js';
import User from '../models/User.js';

async function seedTimetableData() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected');

        // Get first department (CSE or whatever exists)
        const dept = await Department.findOne();
        if (!dept) {
            console.log('❌ No departments found. Please add departments first.');
            return;
        }

        console.log(`Using department: ${dept.name}`);

        //  Add Subjects
        const subjects = [
            { name: 'Data Structures', code: 'CS301', departmentId: dept.id, credits: 4, semester: 3 },
            { name: 'Algorithms', code: 'CS302', departmentId: dept.id, credits: 4, semester: 3 },
            { name: 'Database Systems', code: 'CS303', departmentId: dept.id, credits: 3, semester: 3 },
            { name: 'Operating Systems', code: 'CS304', departmentId: dept.id, credits: 4, semester: 3 },
            { name: 'Computer Networks', code: 'CS305', departmentId: dept.id, credits: 3, semester: 3 },
            { name: 'Web Technology Lab', code: 'CS306', departmentId: dept.id, credits: 2, semester: 3 },
        ];

        for (const subj of subjects) {
            await Subject.findOrCreate({
                where: { code: subj.code },
                defaults: subj
            });
        }
        console.log('✅ Subjects added');

        // Check if we have teachers
        const teacherCount = await Teacher.count();
        console.log(`📊 Found ${teacherCount} teachers in database`);

        if (teacherCount === 0) {
            console.log('⚠️  No teachers found. Please add teachers first through the User Management page.');
        }

        console.log('\n🎉 Timetable data seeded successfully!');
        console.log('Now you can:');
        console.log('1. Go to Admin Timetable page');
        console.log('2. Click "Add Slot"');
        console.log('3. Select Subject, Teacher, Room, etc.');

        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
}

seedTimetableData();
