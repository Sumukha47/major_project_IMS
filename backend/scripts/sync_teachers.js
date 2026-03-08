import sequelize from '../config/database.js';
import User from '../models/User.js';
import Teacher from '../models/Teacher.js';

async function syncTeachers() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connected');

        // Get all users with role='teacher'
        const teacherUsers = await User.findAll({
            where: { role: 'teacher' }
        });

        console.log(`Found ${teacherUsers.length} users with role='teacher'`);

        let created = 0;
        let existing = 0;

        for (const user of teacherUsers) {
            // Check if Teacher record already exists
            const existingTeacher = await Teacher.findOne({
                where: { userId: user.id }
            });

            if (existingTeacher) {
                console.log(`✓ Teacher record already exists for ${user.name}`);
                existing++;
            } else {
                // Create new Teacher record
                await Teacher.create({
                    employeeId: `EMP${Date.now()}${Math.floor(Math.random() * 1000)}`, // Generate unique employee ID
                    department: 'General', // Default department
                    designation: 'Assistant Professor', // Default designation
                    qualification: 'PhD',
                    experience: 5,
                    userId: user.id
                });
                console.log(`✅ Created Teacher record for ${user.name}`);
                created++;
            }
        }

        console.log(`\n📊 Summary:`);
        console.log(`   - Created: ${created} new teacher records`);
        console.log(`   - Existing: ${existing} teacher records`);
        console.log(`   - Total: ${created + existing} teachers synced`);

        console.log('\n🎉 Teachers table synced successfully!');
        console.log('You can now use the timetable feature.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error syncing teachers:', error);
        process.exit(1);
    }
}

syncTeachers();
