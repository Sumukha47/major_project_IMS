import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Mark = sequelize.define('Mark', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    obtainedMarks: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
    },
    maxMarks: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 100,
    },
    grade: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    // Foreign Keys defined via associations in server.js:
    // - examId
    // - studentId
    // - subjectId
}, {
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['examId', 'studentId', 'subjectId']
        }
    ]
});

export default Mark;
