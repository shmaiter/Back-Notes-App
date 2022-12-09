const User = require("../models/user");

const createNewUser = async (req, res) => {
    // const user = new User(req.body);
    const user = new User(req.body);
    // check for duplicate usernames in the db
    // when using async-await its necesary to use exec() after findOne
    const duplicate = await User.findOne({ username: user.username }).exec();
    if (duplicate) return res.sendStatus(409); //Conflict

    try {
        await user.save();
        // const token = await user.generateAuthToken();
        res.status(201).send({ message: "New Account Created!" });
    } catch (e) {
        console.log(e);
    }
};

const deleteUser = async (req, res) => {
    try {
        await req.user.remove();
        res.status(200).send({
            message: "Your account was deleted along with all your data",
        });
    } catch (e) {
        res.status(500).send();
    }
};

module.exports = { createNewUser, deleteUser };
