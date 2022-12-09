const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const verifyJWT = async (req, res, next) => {
    // console.log(`------------------------------------------------------------------------------------ > VerifyJWT on ${req.method}`, req);
    const authHeader = req.headers.authorization || req.body?.headers?.authorization;
    if (!authHeader || authHeader == undefined || authHeader == null) {
        // console.log("Not found token.............................................................");
        return res.status(401).json({ message: "Unauthenticated" });
    }
    // console.log("authHeader", authHeader);
    try {
        // console.log(req.body.headers.Authorization);
        // const authHeader = req.body.headers.Authorization;
        // console.log("authHeader", authHeader);
        const token = authHeader.split(" ")[1];
        // const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });

        if (!user) {
            throw new Error();
        }
        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        res.status(401).send({ Error: "Unauthenticated" });
    }
};

module.exports = verifyJWT;
