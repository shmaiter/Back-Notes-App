const express = require("express");
const router = express.Router();
const notesController = require("../controllers/notesController");
const verifyJWT = require("../middleware/verifyJWT");

// router.use(verifyJWT);
router.route("/").get(verifyJWT, notesController.getAllNotes).post(verifyJWT, notesController.createNote).delete(verifyJWT, notesController.deleteNote);

// router.route("/:id").get(notesController.getSingleNote);

module.exports = router;
