const express = require("express");
const router = express.Router();
const container = require("./containes")



router.post("/save-new", container.createNewBlog);



router.get("/list-all", container.listAllBlog)

router.get("/latest-Blog" , container.latestBlog )

router.get("/get-specfic-Blog/:id", container.listSpecficBlog)

module.exports = router;