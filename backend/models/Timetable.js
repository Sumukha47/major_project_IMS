import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Department from './Department.js';
import Subject from './Subject.js';
import Teacher from './Teacher.js';

const Timetable = sequelize.define('Timetable', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    departmentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Departments',
            key: 'id'
        }
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    semester: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    section: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    day: {
        type: DataTypes.ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
        allowNull: false,
    },
    startTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    endTime: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subjectId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Subjects',
            key: 'id'
        }
    },
    teacherId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Teachers',
            key: 'id'
        }
    },
    room: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM('Lecture', 'Lab', 'Tutorial'),
        defaultValue: 'Lecture',
    }
}, {
    timestamps: true,
});

// Associations
Timetable.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });
Timetable.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' });
Timetable.belongsTo(Teacher, { foreignKey: 'teacherId', as: 'teacher' });

Department.hasMany(Timetable, { foreignKey: 'departmentId' });
Subject.hasMany(Timetable, { foreignKey: 'subjectId' });
Teacher.hasMany(Timetable, { foreignKey: 'teacherId' });

export default Timetable;
