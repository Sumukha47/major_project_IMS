import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Teacher from './Teacher.js';
import Department from './Department.js';
import Subject from './Subject.js';

const Resource = sequelize.define('Resource', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    fileUrl: {
        type: DataTypes.STRING(500),
        allowNull: false,
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    fileType: {
        type: DataTypes.ENUM('pdf', 'doc', 'docx', 'ppt', 'pptx', 'video', 'link', 'other'),
        allowNull: false,
    },
    fileSize: {
        type: DataTypes.INTEGER, // in bytes
        allowNull: true,
    },
    // Filtering fields
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
        validate: {
            min: 1,
            max: 4
        }
    },
    semester: {
        type: DataTypes.INTEGER,
        allowNull: true, // NULL = all semesters
        validate: {
            min: 1,
            max: 8
        }
    },
    subjectId: {
        type: DataTypes.UUID,
        allowNull: true, // NULL = general resource
        references: {
            model: 'Subjects',
            key: 'id'
        }
    },
    // Metadata
    uploadedBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Teachers',
            key: 'id'
        }
    },
    downloads: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    timestamps: true,
});

// Associations
Resource.belongsTo(Teacher, { foreignKey: 'uploadedBy', as: 'uploader' });
Resource.belongsTo(Department, { foreignKey: 'departmentId', as: 'department' });
Resource.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' });

Teacher.hasMany(Resource, { foreignKey: 'uploadedBy' });
Department.hasMany(Resource, { foreignKey: 'departmentId' });
Subject.hasMany(Resource, { foreignKey: 'subjectId' });

export default Resource;
