const express = require('express');
var bodyparser = require('body-parser');
const app = express();
const PORT = 8080
const mongo = require("./database");
app.use(express.json())
app.use(express.urlencoded())

const userRouter = require("./api/login");
const jobRouter = require("./api/listing")
const interestedApplicantRouter = require("./api/applicant")

app.use("/users", userRouter)
app.use("/jobs", jobRouter)
app.use('/applicants', interestedApplicantRouter)


app.get('/ping', (req, res) => {
    console.log("pong")
    res.status(200).send("Pong")
})

app.listen(PORT, async () => {
    await mongo.mongoConnect()
    console.log(`server listening to ${PORT}`)
})
