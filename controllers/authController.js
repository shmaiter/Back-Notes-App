const User = require("../models/user");

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findByCredentials(username, password);
        const token = await user.generateAuthToken();
        res.status(200).send({ user, token });
    } catch (e) {
        res.status(500).send({ message: "Unable to login" });
    }
};

const handleLogout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token_) => {
            return token_.token !== req.token;
        });
        await req.user.save();

        res.status(200).send({ message: "Logged Out" });
    } catch (e) {
        res.status(500).send(e);
    }
};

module.exports = { handleLogin, handleLogout };
