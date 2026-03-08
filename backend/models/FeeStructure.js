import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const FeeStructure = sequelize.define('FeeStructure', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false, // For department-specific fees
    },
    academicYear: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    semester: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    lateFeeApplicable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    lateFeeAmount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    },
    lateFeePerDay: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    },
    createdBy: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: User,
            key: 'id',
        },
    },
    updatedBy: {
        type: DataTypes.UUID,
        allowNull: true,
        references: {
            model: User,
            key: 'id',
        },
    },
}, {
    timestamps: true,
});

export default FeeStructure;
