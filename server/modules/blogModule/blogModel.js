const mongoose = require("mongoose");
const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"]
const date = new Date();
const TodayDate = date.getDate() + " - " + months[date.getMonth()] + " - " + date.getFullYear();
const BlogSchema = new mongoose.Schema({
    title: String,
    author: String,
    cetagory: String,
    blogBody: String,
    blogImageUrl: String,
    createdOn: ({ type: String, default: TodayDate })
})

const blogModel = new mongoose.model("Blogs", BlogSchema)

module.exports.saveNewBlog = function (data) {
    let newBlog = new blogModel(data);
    return new Promise((resolve, reject) => {
        newBlog.save((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc)
            }
        })
    })
}

module.exports.latestBlog = () => {
    return new Promise((res, rej) => {
        blogModel.find().sort({_id: -1}).limit(1).exec((err, doc) => {
            if (err) {
                rej(err);
            } else {
                res(doc);
            }
        })
    })
}
module.exports.listAllBlogs = function (query = {}) {
    return new Promise((resolve, reject) => {
        blogModel.find(query, (err, docs) => {
            if (err) {
                reject(err)
            } else {
                resolve(docs)
            }
        }).sort({_id: -1})
    })
}


module.exports.listSpecficBlog = (blogId) => {
    return new Promise((resolve, reject) => {
        blogModel.findById(blogId, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc)
            }
        })
    })
}