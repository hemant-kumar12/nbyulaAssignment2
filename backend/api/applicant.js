const Router = require("express").Router();
const mongo = require("../db/dbIndex");
const { verifyTokenAndTerraformer, verifyToken } = require("../utils/auth");

Router
    .post('/interested', verifyToken, markJobInterested)
    .get('/interested', verifyTokenAndTerraformer, getInterestedApplicants)

async function markJobInterested(req, res) {
    let routeName = 'POST users/interested'
    let username = req.user.username
    let { jobId } = req.query
    if (!jobId || !username) {
        throw new Error("Important Parameter Missing")
    }
    try {
        await mongo.interested.markJobInterested(username, jobId)
        res.status(200).send({
            "Message": "Job Marked As Interested successfully",

        })
    } catch (e) {
        console.log(e, routeName)
    }
}

async function getInterestedApplicants(req, res) {
    let routeName = 'POST users/interested'
    let { jobId } = req.query
    if (!jobId) {
        throw new Error("Important Parameter Missing")
    }
    try {
        const user = await mongo.interested.getInterestedUserForJobId(jobId)
        res.status(200).send({
            "Message": "Fetched Interested Candidates for Job successfully",
            user

        })
    } catch (e) {
        console.log(e, routeName)
    }
}

module.exports = Router