
const Router = require("express").Router();
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const mongo = require("../db/dbIndex")

Router
    .post('/signup', userSignup)
    .post('/login', loginUser)


async function loginUser(req, res) {
    let routeName = 'POST users/login'
    let { email, password } = req.body
    if (!email || !password) {
        throw new Error("Login credents missing")
    }
    try {
        const userCheck = await mongo.user.findUserWithEmail(email)
        console.log(userCheck)
        const deHashPass = cryptoJs.AES.decrypt(userCheck.password, "hemantKumar");//decrypting password got from the document
        const finPass = deHashPass.toString(cryptoJs.enc.Utf8);

        if (!userCheck) {
            res.status(404).send({
                "Message": "User Not Found"
            })
        }
        else if (finPass !== password) {
            res.status(401).send("Wrong Credentials");//password check
        }
        else {
            const accessToken = jwt.sign(
                {                        //JSON WEB TOKEN
                    id: userCheck._id,
                    isTerraformer: userCheck.isTerraformer,
                    username: userCheck.username
                },
                "jwtkeyhehe",//JWT KEY 
                { expiresIn: "3d" }
            );

            res.status(200).send({
                "Message": "User Logged In Success",
                accessToken
            })
        }
    } catch (e) {
        console.log(e, routeName)
    }

}

async function userSignup(req, res) {
    let routeName = `/users/signup`
    let { username, email, password, isTerraformer } = req.body
    if (!username || !email || !password) {
        throw new Error("Parameter Missing")
    }
    if (!isTerraformer) { isTerraformer = false }
    password = cryptoJs.AES.encrypt(password, "hemantKumar").toString()
    try {
        mongo.user.saveUsers(username, email, password, isTerraformer)
        res.status(200).send({
            message: "User Saved SuccessFully"
        })
    } catch (e) {
        console.log(e, routeName)
    }

}


module.exports = Router