import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Assuming .env is in backend root

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
});

const viewNotices = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to DB.');
        const [users] = await sequelize.query("SELECT id, name, email, role FROM \"Users\" WHERE name ILIKE '%yash%' OR email ILIKE '%yash%';");
        console.table(users);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await sequelize.close();
    }
};

viewNotices();
