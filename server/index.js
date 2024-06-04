const express = require("express");
const cors = require('cors');
var bodyParser = require('body-parser');
// imports CORS for handling cross-origin requests, Body Parser for parsing request bodies
const ProfileModel = require('./models/profile');

const app = express();
// initializes an Express application instance.

const port = 3000;
// port number on which the server will listen for incoming requests

const db = require("./connection/database"); // imports the database connection established in the 'database.js' file.
const createProfile = require('./controller');

app.use(bodyParser.json());
app.use(cors());

// Route for Getting Profiles
app.get("/profile", async (req, res) => {
    const data = await ProfileModel.findAll({});
    res.status(200).json({ data })
});

const initApp = async () => {
    console.log("Testing the database connection..");

    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");

        // syncs the ProfileModel with the database schema
        await ProfileModel.sync();

        // POST route for creating profiles
        app.post("/profile", createProfile);

        app.listen(port, () => {
            console.log(`Server is running at: http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
};

initApp();


// Model Changes: If you make changes to the model definition,
// such as adding new columns or changing data types,
// you can use the sync method to update the database schema accordingly.