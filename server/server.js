const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');


// get mongoose module exports using the destructuring approach {}
const {mongoose} = require('./db/mongoose');
const {ObjectID} = require('mongodb');

const {Todo} = require('./models/todo');
const {User} = require('./models/user');

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
        return res.status(400).send();
    }
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.status(200).send({todo});
    }).catch((e) => {
        res.status(404).send();
    })
});

app.patch('/todos/:id', (req,res) => {
    var id = req.params.id;
    // Lodash pick - Takes only text and completed varibales from the body of the request
    var body = _.pick(req.body,['text','completed']);
    if(!ObjectID.isValid(id)) {
        return res.status(400).send();
    }

    if(_.isBoolean(body.completed) && body.completed) {
        // Get time returns the milli seconds after Jan 1 1970
        // Set the value into a param called completedAt inside the body variable
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id,{
        $set: body
    }, {
        new: true
    }).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    });

});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};