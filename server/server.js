var express = require('express');
var bodyParser = require('body-parser');


// get mongoose module exports using the destructuring approach {}
var {mongoose} = require('./db/mongoose');
var {ObjectID} = require('mongodb');

var {Todo} = require('./models/todo');
var {User} = require('./models/user');

//This may or maynot be set. Will be set in case of Heroku
const port = process.env.PORT || 3000;

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


app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        // Put the array inside an object. The below is ES6 shorthand for todos: todos
        res.send({todos});
        console.log(User);
    }, (err) => {
        res.status(400).send(e);
    });
});

// GET /todos/1232345
app.get('/todos/:id', (req, res) => {

    var id = req.params.id;
    console.log('ID Received is  : ',id);
    //validate id using ObjectID
    if(!ObjectID.isValid(id)) {
        return res.status(400).send('Please enter a valid ID');
    }
    Todo.findById(id).then((todo)=> {
        if(!todo) {
            return res.status(404).send('No such Todo in DB');
        }
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send('Something went wrong. Please check your input again');
    });
});

app.delete('/todos/:id',  (req,res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)) {
        return res.status(400).send('Please send a valid ID');
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send('Could not remove todo with ID');
        }
        res.status(200).send(`Removed successfully ${todo}`);
    }).catch((e) => {
        res.status(404).send('Could not remove todo with ID');
    })
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};