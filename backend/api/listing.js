const Router = require("express").Router();
const mongo = require("../db/dbIndex");
const { verifyTokenAndTerraformer, verifyToken } = require("../utils/auth");

Router
    .post('/list', verifyTokenAndTerraformer, jobUpload)
    .get('/list', verifyToken, getAllJobs)
    .put('/list', verifyTokenAndTerraformer, archiveJobs)


async function jobUpload(req, res) {
    let routeName = 'POST jobs/list'
    let { email,
        title,
        description,
        location,
        deadline,
        phone } = req.body

    try {
        await mongo.jobs.uploadJobs(email, title, description, location, deadline, phone)
        res.status(200).send({
            "Message": "Job posted successfully"
        })
    } catch (e) {
        console.log(e, routeName)
    }
}

async function getAllJobs(req, res) {
    let routeName = 'POST jobs/list'

    try {
        const jobs = await mongo.jobs.getAllJobs();
        res.status(200).send({
            "Message": "Job fetched successfully",
            jobs
        })
    } catch (e) {
        console.log(e, routeName)
    }
}

async function archiveJobs(req, res) {
    let routeName = 'PUT jobs/list'
    let { jobId } = req.query
    if (!jobId) {
        throw new Error("Parameter Missing")
    }
    try {
        const jobs = await mongo.jobs.archiveJobs(jobId);
        res.status(200).send({
            "Message": "Job Archived successfully",
            jobs
        })
    } catch (e) {
        console.log(e, routeName)
    }
}

module.exports = Router