import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Setting = sequelize.define('Setting', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    value: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    group: {
        type: DataTypes.STRING, // 'institution', 'system', 'notifications'
        defaultValue: 'institution',
    },
    type: {
        type: DataTypes.STRING, // 'text', 'boolean', 'json'
        defaultValue: 'text',
    }
}, {
    timestamps: true,
});

export default Setting;
