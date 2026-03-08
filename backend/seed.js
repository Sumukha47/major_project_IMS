import bcrypt from 'bcryptjs';
import sequelize from './config/database.js';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const seed = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Connected to DB');

        await sequelize.sync();

        const salt = await bcrypt.genSalt(10);
        // Hash for 'password123' generated with bcryptjs
        const password = await bcrypt.hash('password123', 10);

        const users = [
            {
                name: 'Admin User',
                email: 'admin@nit.edu.in',
                password: password,
                role: 'admin',
                avatar: ''
            },
            {
                name: 'Teacher User',
                email: 'teacher@nit.edu.in',
                password: password,
                role: 'teacher',
                avatar: ''
            },
            {
                name: 'Student User',
                email: 'student@nit.edu.in',
                password: password,
                role: 'student',
                avatar: ''
            }
        ];

        for (const user of users) {
            const exists = await User.findOne({ where: { email: user.email } });
            if (!exists) {
                await User.create(user);
                console.log(`Created user: ${user.email}`);
            } else {
                console.log(`User exists: ${user.email}`);
            }
        }

        console.log('✅ Seeding complete');
        process.exit();
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seed();
