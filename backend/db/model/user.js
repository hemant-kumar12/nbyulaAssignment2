const mongo = require(".././../database")
let dbName = "job-board"
let collectionName = "users"

async function saveUsers(username, email, password, isTerraformer) {
    let client
    try {
        client = await mongo.mongoConnect();
        let db = await client.db(dbName).collection(collectionName);
        await db.insertOne({
            username,
            email,
            password,
            isTerraformer,
            timestamp: Date.now()
        })
        console.log("User Saved In DB")
    } catch (e) {
        console.log(e, "DB Error")
    }
}

async function findUserWithEmail(email) {
    let client
    try {
        client = await mongo.mongoConnect();
        let db = await client.db(dbName).collection(collectionName);
        const res = await db.findOne({ email })
        console.log("User Searching In DB")
        return res
    } catch (e) {
        console.log(e, "DB Error")
    }
}

module.exports = {
    saveUsers,
    findUserWithEmail
}