var express = require('express');
const app = express();
const PORT = 8080

app.get('/ping', (req, res) => {
    console.log("pong")
    res.status(200).send("Pong")
})

app.listen(PORT, () => {
    console.log(`server listening to ${PORT}`)
})
