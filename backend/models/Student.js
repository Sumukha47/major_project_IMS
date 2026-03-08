import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Student = sequelize.define('Student', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    enrollmentNo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    semester: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    section: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    year: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    guardianName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    guardianPhone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    joiningYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    // Foreign Key to User
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    timestamps: true,
});

// Define Association
User.hasOne(Student, { foreignKey: 'userId', as: 'studentProfile', onDelete: 'CASCADE' });
Student.belongsTo(User, { foreignKey: 'userId' });

export default Student;
