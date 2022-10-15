const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, "jwtkeyhehe", (err, user) => {
            if (err) {
                res.status(403).send("Token is not valid");
            }
            else {

                req.user = user;
                next();
            }
        });
    }
    else {
        return res.status(401).send("You are not Authenticated");
    }
};

const verifyTokenAndTerraformer = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isTerraformer) {
            next()
        }
        else {
            res.status(403).send("You are not allowed to do this action");
        }
    })
}

module.exports = {
    verifyToken,
    verifyTokenAndTerraformer
}