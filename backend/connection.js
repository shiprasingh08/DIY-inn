const mongoose = require('mongoose');

const url = "mongodb+srv://shiprasinghhh:riya8726@cluster0.knzy6.mongodb.net/Miniproject1?retryWrites=true&w=majority&appName=Cluster0"

//connect to the database

//asynchronous-return a promise
mongoose.connect(url)
    .then((result) => {
        console.log('connected to database');

    }).catch((err) => {
        console.log(err);

    });

module.exports = mongoose;