// imports 
require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express');

const app = express();
const PORT = process.env.PORT || 4000

//database connection
mongoose.connect(process.env.DATABASE_URL,)
    .then(() => {
        console.log("Connected to db");
    })
    .catch(error => {
        console.error(error.message);
        console.log("Connection error");
    });

const db = mongoose.connection;

//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'my secret key', resave: false, saveUninitialized: "true"}));
app.use(express.json());
app.use(express.static('image'));
//set templates engine

app.set('views engine', 'ejs');


//route prefix
app.use("", require("./routes/routes"));

//server
app.listen(PORT, () => {
    console.log( `Server is listening at http://localhost:${PORT}`);
});

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
