const express = require("express");
const cors = require('cors');

var bodyParser = require('body-parser');
const ProfileModel = require('./models/profile');
const app = express();
const port = 3000;
const db = require("./connection/database");
const createProfile = require('./controller');

app.use(bodyParser.json());
app.use(cors());

app.get("/profile", async (req, res) => {
    const data = await ProfileModel.findAll({});
    res.status(200).json({ data })
});

const initApp = async () => {
    console.log("Testing the database connection..");

    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");

        // Sync the Profile model
        await ProfileModel.sync();

        // Use the profile route after the database connection is established
        app.post("/profile", createProfile);

        app.listen(port, () => {
            console.log(`Server is running at: http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
};

initApp();
