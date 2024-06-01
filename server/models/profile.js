const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../connection/database')

const Profile = sequelize.define('Profile', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,

    },
    name: {
        type: DataTypes.STRING,
        defaultValue: 'Profile'

    },
    location: {
        type: DataTypes.STRING,

    },
    bio: {
        type: DataTypes.STRING,

    },
    about: {
        type: DataTypes.STRING,
        allowNull: false
    },
    followers: {
        type: DataTypes.STRING,

    },
    connections: {
        type: DataTypes.STRING,

    },
    url: {
        type: DataTypes.STRING,

    },
}, {
    tableName: 'profiles'
});
console.log(Profile === sequelize.models.Profile);
module.exports = Profile;

// ALTER TABLE profiles MODIFY about LONGTEXT;
