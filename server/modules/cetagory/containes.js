const CetagoryDbModel = require("./cetagoryModel")

module.exports.createNewCetagory = (req, res) => {
    CetagoryDbModel.saveNewCetagory(req.body)
        .then(success => {
            res.send({ Status: true, Created: true ,  data: success })
        })
        .catch(err => {
            res.send({ Status: false, err: err })
        })
}

module.exports.listAllCetagories = function (req, res) {
    CetagoryDbModel.listAllCetagories()
        .then(success => {
            res.send({ Status: true, Created: true ,  data: success })

        })
        .catch(err => {
            res.send({ Status: false, data: err })
        })
}


module.exports.listSpecficCetagory = (req, res) => {
    const cetagoryId = req.params.id
    console.log(cetagoryId);
    CetagoryDbModel.listSpecficCetagory(cetagoryId)
        .then(data => {
            res.send({ Status: true, Created: true ,  data: data })

        })
        .catch(err => {
            res.send({ Status: false, Error: err })
        })
}