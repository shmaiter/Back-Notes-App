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

module.exports = { handleLogout };
