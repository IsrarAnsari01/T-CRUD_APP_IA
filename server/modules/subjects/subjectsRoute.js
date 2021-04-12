const express = require("express");
const subjectDBModel = require("./subjectModel") 
const router = express.Router();

router.get("/", (req, res) => {
    console.log("Successfully get requset");
    res.send({ Status: true })
})

router.post("/add-new", addNewSubject)
router.get("/list-all", veiwAllSubjects)
router.post("/del-this-subject", deleteThisSubject)
module.exports = router;

function addNewSubject(req,res) {
    console.log(req.body);
    console.log(req.body.subject);
    console.log(req.body.subForCls);
    subjectDBModel.saveNewSubject({
        "subjectName": req.body.subject,
        "classForSubject": req.body.subForCls,
        "createdOn": new Date()
    })
        .then(success => {
            console.log("Subject Added SuccessFully")
            res.send({Status: true})
        }) 
        .catch(err => {
            console.log("Error in Sending Object")
            res.send({Status: false})
            
        })
}
function veiwAllSubjects(req,res){
    subjectDBModel.getMatchingSubject({})
        .then(data => {
            res.send({Found: true , data})
        }) 
        .catch(err => {
            console.log("Error in getting data")
                res.send({Found: false , err})
        })
    
}
function deleteThisSubject(req, res) {
    console.log(req.body.id) 
    subjectDBModel.deleteMatchingUser(req.body.id)
        .then(success => {
            console.log("Subject Delete Successfully " , success)
            res.send({Status: true})
        })
        .catch(err => {
            console.log("Error in Delete Subject " , err)
            res.send({Status: false})

        })
}