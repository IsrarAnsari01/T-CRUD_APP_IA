const commentDbModel = require("./commentModel")

module.exports.createNewComment = (req, res) => {
    console.log(req.body)
    commentDbModel.saveNewComment(req.body)
        .then(success => {
            res.send({ Status: true, Created: true ,  data: success })
        })
        .catch(err => {
            res.send({ Status: false, err: err })
        })
}

module.exports.listAllComments = function (req, res) {
        const specficBlogId = req.params.id
    commentDbModel.listAllComments({blogId:specficBlogId})
        .then(success => {
            res.send({ Status: true, Created: true ,  data: success })
        })
        .catch(err => {
            res.send({ Status: false, data: err })
        })
}


module.exports.listSpecficCetagory = (req, res) => {
    const cetagoryId = req.params.id
    console.log(cetagoryId);
    CetagoryDbModel.listSpecficCetagory(cetagoryId)
        .then(data => {
            res.send({ Status: true, Created: true ,  data: data })

        })
        .catch(err => {
            res.send({ Status: false, Error: err })
        })
}