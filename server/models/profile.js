const { Sequelize, DataTypes } = require('sequelize');
// This line imports both the Sequelize constructor and the DataTypes object from the 'sequelize' library. 
// The DataTypes object is used to define the types of columns in the database table.

const sequelize = require('../connection/database') //imports the Sequelize instance

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

// defines a Sequelize model named 'Profile'.
// The 'Profile' model has attributes such as 'id', 
// 'name', 'location', 'bio', 'about', 'followers', 'connections', and 'url'
// Each attribute is defined within an object 
// with properties specifying its data type and constraints.
// { tableName: 'profiles' }
// This option specifies the name of the database table to which the model 'Profile' corresponds. 

console.log(Profile === sequelize.models.Profile);
// This line logs whether the defined model 'Profile' matches the model registered with Sequelize.
module.exports = Profile;

// ALTER TABLE profiles MODIFY about LONGTEXT;
