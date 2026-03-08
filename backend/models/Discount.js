import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Discount = sequelize.define('Discount', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    type: {
        type: DataTypes.ENUM('Scholarship', 'Waiver', 'Concession'),
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING, // e.g., 'SC', 'ST', 'Merit', 'Staff Ward'
        allowNull: false,
    },
    amountType: {
        type: DataTypes.ENUM('Percentage', 'Fixed'),
        allowNull: false,
    },
    value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    approvedBy: {
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

export default Discount;
