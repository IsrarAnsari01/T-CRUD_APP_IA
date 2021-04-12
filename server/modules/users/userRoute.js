const express = require("express");
const userDBModel = require("./userModel")
const router = express.Router();
const forEncryptPassword = require("../encriptionPassword/EncryptionPassword")
const session = require("express-session")
router.get("/", (req, res) => {
    console.log("Successfully get requset");
    res.send({ Status: true })
})

router.post("/add-new-user", addNewUser)
router.post("/find-user", findSpecficUser)
router.post("/del-this-user", deleteThisuser)
module.exports = router;
function addNewUser(req, res) {
    console.log(req.body);
    let randomNumber = Math.floor((Math.random() * 100000) + 1)
    let data = req.body
    data.verification = randomNumber;
    forEncryptPassword.EncryptionPassword(req.body.userPassword)
        .then(userpassword => {
            data.userPassword = userpassword
            return userDBModel.saveNewUser(data)
                .then(success => {
                    console.log("User Added SuccessFully", success)
                    res.send({ Status: true })
                })
        })
        .catch(err => {
            console.log("Some thing went Wrong", err)
        })
}
function findSpecficUser(req, res) {
    let data = {userEmail: req.body.userEmail, userPassword: req.body.userPassword}
    forEncryptPassword.EncryptionPassword(data.userPassword)
        .then(encryptedPassword => {
            data.userPassword = encryptedPassword
            return userDBModel.getMatchingUser(data)
                .then(specficUser => {
                    console.log("Special User Found => ", specficUser)
                    res.send({ Found: true, Status: true, data: specficUser })
                })
        })
        .catch(err => {
            console.log("Error in getting data" , err)
            res.send({ Found: false, err: err })
        })

}
function deleteThisuser(req, res) {
    console.log(req.body.id)
    userDBModel.deleteMatchingUser(req.body.id)
        .then(success => {
            console.log("User Delete Successfully ", success)
            res.send({ Status: true })
        })
        .catch(err => {
            console.log("Error in Delete Subject ", err)
            res.send({ Status: false })

        })
}   