const express = require("express");
const teacherDBModel = require("./teacherModel")
const router = express.Router();
const encrypPassword = require("../encriptionPassword/EncryptionPassword")
router.get("/", (req, res) => {
    console.log("Successfully get requset");
    res.send({ Status: true })
})

router.post("/add-new-teacher", addNewTeacher)

router.get("/all-teacher", listAllStudent)

router.post("/del-this-teacher", deleteThisTeacher)

module.exports = router;

function addNewTeacher(req, res) {
    let data = { fName: req.body.fName, lName: req.body.lName, email: req.body.email, password: req.body.password, education: req.body.education }
    encrypPassword.EncryptionPassword(data.password)
        .then(encryptedPassword => {
            data.password = encryptedPassword
            return teacherDBModel.saveNewTeacher(data)
                .then(success => {
                    console.log("Teacher Saved Success Fully")
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
    teacherDBModel.getMatchingTeacher({})
        .then(data => {
            res.send({ Found: true, data })
        })
        .catch(err => {
            console.log("Error in getting Data ", err)
            res.send({ Found: false })
        })
}

function deleteThisTeacher(req, res) {
    console.log(req.body.id)
    teacherDBModel.deleteMatchingTeacher(req.body.id)
        .then(success => {
            console.log("Teacher Delete Successfully ", success)
            res.send({ Status: true })
        })
        .catch(err => {
            console.log("Error in Delete Teacher ", err)
            res.send({ Status: false })

        })
}