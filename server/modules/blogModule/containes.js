const blogDbModel = require("./blogModel")
const imageConverter = require("../../helper/imageConverter")



module.exports.createNewBlog = (req, res) => {
    let data = JSON.parse(req.body.blogDetails)
    imageConverter.imageConverter(req.file.buffer.toString('base64'))
        .then(imageUploadResult => {

            data.blogImageUrl = imageUploadResult.url;
            return blogDbModel.saveNewBlog(data)

                .then(success => {
                    res.send({ Status: true, data: success })
                })
        })
        .catch(err => {
            console.log("Got an Error", err)
            res.send({ Status: false })
        })
}

module.exports.latestBlog = (req , res) => {
    blogDbModel.latestBlog()
    .then(latestBlog => {
        res.send({Status: true , found : true , receivedBlog: latestBlog})
    })
    .catch(err => {
        res.send({Status: false, Error: err})
    })
} 

module.exports.listAllBlog = function (req, res) {
    blogDbModel.listAllBlogs()
        .then(success => {
            res.send({ Status: true, data: success })

        })
        .catch(err => {
            res.send({ Status: false, data: err })
        })
}


module.exports.listSpecficBlog = (req, res) => {
    const blogId = req.params.id
    console.log(blogId);
    blogDbModel.listSpecficBlog(blogId)
        .then(data => {
            res.send({ Status: true, data: data })
        })
        .catch(err => {
            res.send({ Status: false, Error: err })
        })
}