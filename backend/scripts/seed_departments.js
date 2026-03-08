import sequelize from '../config/database.js';
import Department from '../models/Department.js';
import dotenv from 'dotenv';
dotenv.config();

const seedDepartments = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB Connected');

        // Sync model to create table if not exists (careful with force: true in prod, but safe here for dev)
        await Department.sync();

        const departments = [
            { name: 'Computer Science', hod: 'Dr. Sarah Wilson', description: 'Department of Computer Science & Engineering' },
            { name: 'Information Technology', hod: 'Prof. Michael Chen', description: 'Department of Information Technology' },
            { name: 'Electronics & Comm.', hod: 'Dr. Robert Taylor', description: 'Department of Electronics & Telecommunication' },
            { name: 'Mechanical Engg.', hod: 'Prof. David Miller', description: 'Department of Mechanical Engineering' },
            { name: 'Civil Engineering', hod: 'Dr. Emily Davis', description: 'Department of Civil Engineering' },
            { name: 'Electrical Engg.', hod: 'Prof. James Wilson', description: 'Department of Electrical Engineering' }
        ];

        for (const dept of departments) {
            const existing = await Department.findOne({ where: { name: dept.name } });
            if (!existing) {
                await Department.create(dept);
                console.log(`Created: ${dept.name}`);
            } else {
                console.log(`Exists: ${dept.name}`);
            }
        }

        console.log('Seeding Complete');

    } catch (err) {
        console.error(err);
    } finally {
        await sequelize.close();
    }
};

seedDepartments();
