const express = require("express");
const router = express.Router();
const container = require("./containes")



router.post("/new-comment", container.createNewComment);



router.get("/list-comments/:id", container.listAllComments)

// router.get("/get-specfic-cetagory/:id", container.listSpecficCetagory)

module.exports = router;