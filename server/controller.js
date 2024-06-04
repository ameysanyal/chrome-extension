const ProfileModel = require("./models/profile");

const createProfile = async (req, res) => {

    const { n, location, bio, about, followers, connections, url } = req.body;
    const data = await ProfileModel.create({
        name: n,
        location: location,
        bio: bio,
        about: about,
        followers: followers,
        connections: connections,
        url: url,
    })
    res.status(201).json({ data })

};
// createprofile function adds a new profile record in database 
// with the ProfileModel using data from  post request body
// It passes an object containing the extracted data from 
// the request body to the create() method of the ProfileModel.

module.exports = createProfile;
