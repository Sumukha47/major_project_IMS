import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';

const Notice = sequelize.define('Notice', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    priority: {
        type: DataTypes.ENUM('Normal', 'Important', 'Urgent'),
        defaultValue: 'Normal'
    },
    status: {
        type: DataTypes.ENUM('Published', 'Pending Approval', 'Archived'),
        defaultValue: 'Published'
    },
    audience: {
        type: DataTypes.STRING, // 'All', 'Student', 'Teacher'
        allowNull: false
    },
    pinned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    // Foreign Key to User (Who posted it)
    postedBy: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}, {
    timestamps: true
});

// Associations
User.hasMany(Notice, { foreignKey: 'postedBy', as: 'postedNotices', onDelete: 'CASCADE' });
Notice.belongsTo(User, { foreignKey: 'postedBy', as: 'author' });

export default Notice;
