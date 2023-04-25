async function getProfileByEmail (collection, email) { 
    try {
        const foundUser = await collection.findOne({ email: email }).exec()
        return foundUser;
    } catch (err) { 
        console.error(err); 
        throw err;
    }
}

module.exports = { 
    getProfileByEmail: getProfileByEmail,
}