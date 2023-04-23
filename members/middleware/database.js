const User = require("../models/User");

async function getUserByEmail (email) { 
    try {
        const foundUser = await User.findOne({ email: email }).exec()
        return foundUser;
    } catch (err) { 
        console.error(err); 
        throw err;
    }
}

module.exports = { 
    getUserByEmail: getUserByEmail,
}