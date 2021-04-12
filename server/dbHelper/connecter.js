const mongoose = require("mongoose");
module.exports.getConnectionWithDb = function () {
    mongoose.connect("mongodb+srv://user_01:user_01@cluster0.e46ff.mongodb.net/sms?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    db.once("error", err => {
        if (err) {
            console.log("Error in Running DB ", err);
        }
    })
    db.once("open", () => {
        console.log("Connected to DB successfully")
    })


}