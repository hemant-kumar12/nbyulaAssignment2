const mongo = require("../../database")
let dbName = "job-board"
let collectionName = "applicants"

async function markJobInterested(username, jobId) {
    let client
    try {
        client = await mongo.mongoConnect();
        let db = await client.db(dbName).collection(collectionName);
        await db.insertOne({
            jobId,
            username,
            timestamp: Date.now()
        })
        console.log("Marked Job Interested In DB")
    } catch (e) {
        console.log(e, "DB Error")
    }
}

async function getInterestedUserForJobId(jobId) {
    let client
    try {
        client = await mongo.mongoConnect();
        let db = await client.db(dbName).collection(collectionName);
        const applicants = await db.find({ jobId }).project({ _id: 0, username: 1 }).toArray();
        console.log("Fetched Interested Candidates of Job")
        return applicants
    } catch (e) {
        console.log(e, "DB Error")
    }
}

module.exports = {
    markJobInterested,
    getInterestedUserForJobId
}