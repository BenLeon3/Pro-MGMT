require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
//const port = process.env.PORT || 8080;

//********** */
const mongoose = require("mongoose");

//************ */
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
// app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/createProject', require('./newproject/newProjects.controller'));
app.use('/createTask', require('./projectTask/newTasks.controller'));

//************* */
app.use(express.static(__dirname + '/dist')); //

// global error handler
app.use(errorHandler);

//************* */
app.get("*  ", (req, res) => {
    res.sendFile(path.join(__dirname,"client", "build", "index.html"));//
});

//*************** */
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://mpro:9SbfTTbFQqJkv58@ds249233.mlab.com:49233/heroku_qnmwcxqt";

// // Connect to the Mongo DB
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// start server
 const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
