const mongoose = require("mongoose");
const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"]
const date = new Date();
const TodayDate = date.getDate() + " - " + months[date.getMonth()] + " - " + date.getFullYear();

const CommentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    blogId: String,
    CreatedOn: ({ type: String, default: TodayDate })
})

const CommentModel = new mongoose.model("Comments", CommentSchema)

module.exports.saveNewComment = function (data) {
    let newComment = new CommentModel(data);
    return new Promise((resolve, reject) => {
        newComment.save((err, doc) => {
            if (err) {
                console.log("Error in save data " , err)
                reject(err);
            } else {
                resolve(doc)
            }
        })
    })
}

module.exports.listAllComments = function (query) {
    return new Promise((resolve, reject) => {
        CommentModel.find(query, (err, docs) => {
            if (err) {
                reject(err)
            } else {
                resolve(docs)
            }
        })
    })
}

