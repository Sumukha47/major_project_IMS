import sequelize from '../config/database.js';
import Notice from '../models/Notice.js';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();

const testStudentNotices = async () => {
    try {
        await sequelize.authenticate();
        console.log('DB Connected');

        const audience = 'Student';
        const notices = await Notice.findAll({
            where: {
                audience: ['Student', 'All']
            },
            include: [
                { model: User, as: 'author', attributes: ['name', 'role'] }
            ],
            order: [['createdAt', 'DESC']]
        });

        console.log(`Found ${notices.length} notices for Student:`);
        notices.forEach(n => {
            console.log(`- [${n.audience}] ${n.title} (by ${n.author?.name})`);
        });

    } catch (err) {
        console.error(err);
    } finally {
        await sequelize.close();
    }
};

testStudentNotices();
