const multer = require("multer")
const express = require("express");
const bodyParser = require("body-parser")
const cors = require("cors");
const session = require('express-session')
const upload = multer({});
const dbHelper = require('./dbHelper/connecter')
const app = express();
// const port = 9000;
const port = process.env.PORT || 9000;
app.use(session({
    secret: 'Hello from Sessions',
    resave: false,
    saveUninitialized: true,
}))
const studentRoutes = require("./modules/students/studentRoute")
const subjectRoutes = require("./modules/subjects/subjectsRoute")
const teacherRoutes = require("./modules/teachers/teacherRoute")
const blogRoutes = require("./modules/blogModule/blogRoutes")
const userRoutes = require("./modules/users/userRoute")
const cetagoryRoutes = require("./modules/cetagory/cetagoryRoutes");
const commentsRoutes = require("./modules/comment/commentRoutes")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.get("/", (req, res) => {
    res.send("<h2> Welcome to Student management System and Bloging app </h2>")
})
app.use("/student", studentRoutes);
app.use("/subject", subjectRoutes);
app.use("/teacher", teacherRoutes);
app.use("/comment", commentsRoutes)
app.use("/users", userRoutes);
app.use("/blog", upload.single('blogPicture'), blogRoutes)
app.use("/cetagory", cetagoryRoutes)
app.use("*", (req, res) => {
    res.send("<h2> Welcome to Student management System and Bloging app </h2>")
})
app.listen(port, err => {
    if (err) {
        console.log("Server Running with Error", err);
        return;
    }
    console.log("Server Running Successfully")
    dbHelper.getConnectionWithDb();
})