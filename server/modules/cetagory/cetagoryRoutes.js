const express = require("express");
const router = express.Router();
const container = require("./containes")



router.post("/add-new", container.createNewCetagory);



router.get("/list-all", container.listAllCetagories)

router.get("/get-specfic-cetagory/:id", container.listSpecficCetagory)

module.exports = router;