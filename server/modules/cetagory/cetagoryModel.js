const mongoose = require("mongoose");
const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "September", "Oct", "Nov", "Dec"]
const date = new Date();
const TodayDate = date.getDate() + " - " + months[date.getMonth()] + " - " + date.getFullYear();
const CetagorySchema = new mongoose.Schema({
    aName: String,
    cName: String,
    createdOn: ({ type: String, default: TodayDate })
})

const CetagoryModel = new mongoose.model("Cetagories", CetagorySchema)

module.exports.saveNewCetagory = function (data) {
    let newcetagory = new CetagoryModel(data);
    return new Promise((resolve, reject) => {
        newcetagory.save((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc)
            }
        })
    })
}

module.exports.listAllCetagories = function (query = {}) {
    return new Promise((resolve, reject) => {
        CetagoryModel.find(query, (err, docs) => {
            if (err) {
                reject(err)
            } else {
                resolve(docs)
            }
        })
    })
}


module.exports.listSpecficCetagory = (blogId) => {
    return new Promise((resolve, reject) => {
        CetagoryModel.findById(blogId, (err,doc ) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc)
            }
        })
    })
}