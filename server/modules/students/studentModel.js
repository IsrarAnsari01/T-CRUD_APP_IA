const mongoose = require("mongoose");

const StudentsSchema = new mongoose.Schema({
    name: String,
    fName: String,
    password: String,
    gender: String,
    studentClass: String,
    subjects: [String],
    createdOn: {type:Date , default: new Date()}
})

const studentModel = new mongoose.model("students", StudentsSchema);

module.exports.saveNewStudent = function (data) {
    let newStudent = new studentModel(data);
    return new Promise((resolve, reject) => {
        newStudent.save((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc)
            }
        })
    })
}


module.exports.getMatchingStudent = function (query = {}) {
    return new Promise((resolve, reject) => {
        studentModel.find(query, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc)
            }
        })
    })
}
module.exports.getSpecficStudent = function (id) {
    return new Promise((resolve, reject) => {
        studentModel.findById(id, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc)
            }
        })
    })
}

module.exports.deleteMatchingUser = function(query) {
    return new Promise((resolve , reject) => {
        studentModel.findByIdAndRemove(query , (err , doc) => {
            if(err) {
                reject(err)
            } else {
                resolve(doc)
            }
        })           
    })
}

module.exports.updateMatchingUser = function(id , data) {
    return new Promise((resolve , reject) => {
        studentModel.updateOne({_id: id}, data , (err , doc) => {
            if(err) {
                reject(err)
            } else {
                resolve(doc)
            }
        })           
    })
}