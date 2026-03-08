import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Teacher = sequelize.define('Teacher', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    employeeId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    qualification: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    experience: {
        type: DataTypes.INTEGER, // Years of experience
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
User.hasOne(Teacher, { foreignKey: 'userId', as: 'teacherProfile', onDelete: 'CASCADE' });
Teacher.belongsTo(User, { foreignKey: 'userId' });

export default Teacher;
