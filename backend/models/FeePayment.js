import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import FeeStructure from './FeeStructure.js';

const FeePayment = sequelize.define('FeePayment', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    transactionId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Crucial for security
    },
    amountPaid: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    paymentMethod: {
        type: DataTypes.ENUM('Cash', 'Online', 'Bank Transfer', 'Cheque'),
        defaultValue: 'Online',
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Paid', 'Partial', 'Failed'),
        defaultValue: 'Pending',
    },
    installmentNumber: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
    remainingAmount: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    },
    penaltyApplied: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.00,
    },
    date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    studentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
    },
    feeStructureId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: FeeStructure,
            key: 'id',
        },
    },
    verifiedBy: {
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



export default FeePayment;
