const express = require("express");
const studentDBModel = require("./studentModel")
const router = express.Router();
const encrypPassword = require("../encriptionPassword/EncryptionPassword")
router.get("/", (req, res) => {
    console.log("Successfully get requset");
    res.send({ Status: true })
})

router.post("/add-new-student", addNewStudent)

router.get("/all-student", listAllStudent)

router.get("/specfic-student/:id", selectedStudent)

router.put("/update-student/:id", studentTOUpdate)

router.post("/del-this-user", delThisUser)
module.exports = router;

function addNewStudent(req, res) {
    console.log(req.body);
    let data = { name: req.body.name, fName: req.body.fName, password: req.body.password, gender: req.body.gender, studentClass: req.body.sclass, subjects: req.body.subjects, }
    encrypPassword.EncryptionPassword(data.password)
        .then(encryptedPassword => {
            data.password = encryptedPassword
            return studentDBModel.saveNewStudent(data)
                .then(success => {
                    console.log("Student Saved Success Fully")
                    res.send({ Status: true })
                })
        })
        .catch(err => {
            console.log("Error in Sending Object")
            res.send({ Status: false })

        })
}
function listAllStudent(req, res) {
    console.log(req.body);
    studentDBModel.getMatchingStudent({})
        .then(data => {
            res.send({ Found: true, data })
        })
        .catch(err => {
            console.log("Error in getting Data ", err)
            res.send({ Found: false })
        })
}
function delThisUser(req, res) {
    console.log(req.body.id)
    studentDBModel.deleteMatchingUser(req.body.id)
        .then(success => {
            console.log("User Deleted Successfully ", success)
            res.send({ Status: true })
        })
        .catch(err => {
            console.log("Error to  Delete user  ", err)
            res.send({ Status: false })
        })
}
function selectedStudent(req, res) {
    const id = req.params.id
    console.log(id)
    studentDBModel.getSpecficStudent(id)
        .then(data => {
            console.log("SuccessFully find User ", data)
            res.send({ Found: true, data: data })
        })
        .catch(err => {
            console.log("Error in getting Data ", err)
            res.send({ Found: false })
        })
}

function studentTOUpdate(req, res) {
    const data = req.body.data
    const id = req.body.id;
    encrypPassword.EncryptionPassword(data.passwrod)
        .then(encryptedPassword => {
            data.passwrod = encryptedPassword
            return studentDBModel.updateMatchingUser(id, data)
                .then(success => {
                    console.log("Data Updated ")
                    res.send({ Status: true })
                })

        })
        .catch(err => {
            console.log("SomeThing Went Wrong ")
        })
}