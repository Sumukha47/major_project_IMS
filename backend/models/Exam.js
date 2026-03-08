import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Exam = sequelize.define('Exam', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, // e.g., "Mid-Term 1", "Semester Final"
    },
    term: {
        type: DataTypes.STRING,
        allowNull: false, // e.g., "Fall 2024"
    },
    academicYear: {
        type: DataTypes.STRING,
        allowNull: false, // e.g., "2024-2025"
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('Draft', 'Published'),
        defaultValue: 'Draft',
    }
}, {
    timestamps: true,
});

export default Exam;
