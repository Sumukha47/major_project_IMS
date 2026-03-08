import sequelize from '../config/database.js';
import User from '../models/User.js';
import Teacher from '../models/Teacher.js';

async function debugTeachers() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected\n');

        // Get all users with role='teacher'
        const teacherUsers = await User.findAll({
            where: { role: 'teacher' },
            attributes: ['id', 'name', 'email']
        });

        console.log('=== USERS with role=teacher ===');
        teacherUsers.forEach(u => {
            console.log(`UserID: ${u.id} | Name: ${u.name} | Email: ${u.email}`);
        });

        // Get all Teacher records
        const teachers = await Teacher.findAll({
            attributes: ['id', 'userId', 'employeeId', 'department']
        });

        console.log('\n=== TEACHERS table ===');
        teachers.forEach(t => {
            console.log(`TeacherID: ${t.id} | UserID: ${t.userId} | EmployeeID: ${t.employeeId}`);
        });

        // Check for mismatches
        console.log('\n=== CHECKING MATCHES ===');
        for (const user of teacherUsers) {
            const teacher = teachers.find(t => t.userId === user.id);
            if (teacher) {
                console.log(`✅ ${user.name} - MATCHED`);
            } else {
                console.log(`❌ ${user.name} (${user.id}) - NO TEACHER RECORD!`);
            }
        }

        // Check for orphaned teachers
        console.log('\n=== CHECKING FOR ORPHANED TEACHERS ===');
        for (const teacher of teachers) {
            const user = teacherUsers.find(u => u.id === teacher.userId);
            if (!user) {
                console.log(`⚠️  Teacher ${teacher.id} has userId ${teacher.userId} which doesn't exist in Users!`);
            }
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

debugTeachers();
