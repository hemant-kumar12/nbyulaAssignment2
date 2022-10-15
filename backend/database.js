const mongo = require("mongodb").MongoClient;
let client;
async function mongoConnect() {

    if (client) {
        return client
    }
    console.log("Connecting to Database....")
    client = await mongo.connect("mongodb+srv://admin:admin@nbyulaassignment.bgiszjw.mongodb.net/?retryWrites=true&w=majority")
    console.log("Connected to MongoDB")
    return client
}

module.exports = { mongoConnect }