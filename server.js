require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConnection");
const credentials = require("./middleware/credentials");

const PORT = process.env.PORT || 10000;

connectDB();

app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "*");
    res.set("Access-Control-Allow-Methods", "*");
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }
    next();
});
// app.use(credentials);

// app.use(cors(corsOptions));
// app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/", require("./routes/root"));
app.use("/auth", require("./routes/auth"));
app.use("/logout", require("./routes/logout"));
app.use("/users", require("./routes/users"));
app.use("/notes", require("./routes/notes"));

app.all("*", (req, res) => {
    res.status(404);
    if (req.accepts("html")) {
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (req.accepts("json")) {
        res.json({ message: "404 Not Found" });
    } else {
        res.type("txt").send("404 Not Found");
    }
});

// PENDING errorHandler middleware
// app.use(errorHandler);

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
