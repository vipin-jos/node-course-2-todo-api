var express = require('express');
var bodyParser = require('body-parser');


// get mongoose module exports using the destructuring approach {}
var {mongoose} = require('./db/mongoose');

var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req,res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc)=> {
        res.send(doc);
        console.log(JSON.stringify(doc,undefined,2));
    }, (err) => {
        console.log('could not save todo');
        res.status(400).send(err);
    })
});

app.listen(3000, () => {
    console.log('Started on port 3000');
});