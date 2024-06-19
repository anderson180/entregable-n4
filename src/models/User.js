const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const User = sequelize.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true //Los email no se repitan, van a hace unicos
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
    },
    dateOfBirth: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
});

module.exports = User;