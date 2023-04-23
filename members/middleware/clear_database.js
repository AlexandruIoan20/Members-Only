async function clear_collection(collection) { 
    await collection.deleteMany({}).exec(); 
};

module.exports = clear_collection; 