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

module.exports = createProfile;
