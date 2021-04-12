const mongoose = require("mongoose");

const TeachersSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    password: String,
    education: String,
    createdOn: {type: Date , default: new Date()}
})

const teacherModel = new mongoose.model("teachers", TeachersSchema);

module.exports.saveNewTeacher = function (data) {
    let newTeacher = new teacherModel(data);
    return new Promise((resolve, reject) => {
        newTeacher.save((err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc)
            }
        })
    })
}


module.exports.getMatchingTeacher = function (query = {}) {
    return new Promise((resolve, reject) => {
        // let newStudent = new studentModel(data);
        teacherModel.find(query, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc)
            }
        })
    })
}

module.exports.deleteMatchingTeacher = function (query) {
    return new Promise((resolve, reject) => {
        teacherModel.findByIdAndRemove(query, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc)
            }
        })
    })
}