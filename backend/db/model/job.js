const mongo = require(".././../database")
let dbName = "job-board"
let collectionName = "jobs"
const { v4: uuidv4 } = require('uuid');


async function uploadJobs(email, title, description, location, deadline, phone) {
    let client
    try {
        client = await mongo.mongoConnect();
        let db = await client.db(dbName).collection(collectionName);
        await db.insertOne({
            jobId: uuidv4(),
            email,
            title,
            description,
            location,
            deadline,
            phone,
            "archive": false,
            timestamp: Date.now()
        })
        console.log("Jobs Saved In DB")
    } catch (e) {
        console.log(e, "DB Error")
    }
}

async function getAllJobs() {
    let client
    try {
        client = await mongo.mongoConnect();
        let db = await client.db(dbName).collection(collectionName);
        const res = await db.find({ "archive": false }).toArray()
        console.log("Jobs Fetched Successfully")
        return res
    } catch (e) {
        console.log(e, "DB Error")
    }
}

async function archiveJobs(jobId) {
    let client
    if (!jobId) {
        throw new Error("JobId Missing")
    }
    try {
        client = await mongo.mongoConnect();
        let db = await client.db(dbName).collection(collectionName);
        const res = await db.findOneAndUpdate({ jobId }, { "$set": { "archive": true } })
        console.log("Job Archived Successfully")
        return res
    } catch (e) {
        console.log(e, "DB Error")
    }
}



module.exports = {
    uploadJobs,
    getAllJobs,
    archiveJobs
}