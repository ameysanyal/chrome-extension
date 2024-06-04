const { Sequelize } = require('sequelize');
// This line imports the Sequelize constructor from the 'sequelize' library, 
// allowing us to create Sequelize instances to interact with MySQL databases.


const sequelize = new Sequelize("linkedin", "root", "mysql", {
    host: "127.0.0.1",
    dialect: "mysql",
});
// This code initializes a new Sequelize instance.
// It specifies the database name as "linkedin", 
// the username as "root", the password as "mysql", and the host as "127.0.0.1" (localhost).
// The dialect option specifies the type of database being used, in this case, MySQL.

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

// The authenticate() method attempts to authenticate the connection to the database.
// If successful, it prints "Connection has been established successfully." to the console.
// If authentication fails, it catches the error and prints "Unable to connect to the database:" followed by the error message.

module.exports = sequelize;
// exports the Sequelize instance for use in other modules.