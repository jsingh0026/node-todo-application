const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const Users = require('./api/routes/users');
const Tasks = require('./api/routes/to-do-list');

// to parse body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors allow
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });
  
// mongo db connections
mongoose.connect( "mongodb+srv://admin:admin@cluster0-ru1lu.mongodb.net/test?retryWrites=true&w=majority", 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/users', Users);
app.use('/tasks', Tasks);


module.exports = app;
