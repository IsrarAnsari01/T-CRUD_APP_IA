const mongoose = require("mongoose");
const conformationEmail = require("../nodemalier/conformationMail")
let flag = false;
const UserSchema = new mongoose.Schema({
    userName: String,
    userEmail:{
    type: String,
    unique: true
    },
    userPassword: String,
    verification: Number,
    createdOn: {type: String, default: new Date()}
})

const UserModel = new mongoose.model("Users", UserSchema);
module.exports.saveNewUser = function (data) {
    let newUser = new UserModel(data);
    return new Promise((resolve, reject) => {
        newUser.save((err, doc) => {
            if (err) {
                reject(err);
            } else {
                conformationEmail.conformationEmailSender(doc.userEmail)
                    .then(success => {
                        flag = success
                    })
                    .catch(err => {
                        console.log("Something went wrong", err)
                    })
            }
            if (flag) {
                resolve(doc)
                return;
            }
        })
    })
}


module.exports.getMatchingUser = function (userInfo) {
    return new Promise((resolve, reject) => {
        UserModel.find({userEmail: userInfo.userEmail}, (err, doc) => {
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
        UserModel.findByIdAndRemove(query, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                resolve(doc)
            }
        })
    })
}