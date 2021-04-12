const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
    subjectName: String,
    classForSubject: Number,
    createdOn: Date,
})

const SubjectModel = new mongoose.model("Subjects", SubjectSchema);

module.exports.saveNewSubject = function (data) {
    let newSubject = new SubjectModel(data);
    return new Promise((resolve, reject) => {
        newSubject.save((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc)
            }
        })
    })
}


module.exports.getMatchingSubject = function (query = {}) {
    return new Promise((resolve, reject) => {
        SubjectModel.find(query, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc)
            }
        })
    })
}

module.exports.deleteMatchingUser = function (query) {
    return new Promise((resolve, reject) => {
        SubjectModel.findByIdAndRemove(query, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc)
            }
        })
    })

    // return  SubjectModel.findByIdAndRemove(query);
}