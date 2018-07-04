const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}) - removes all the items in the database
Todo.remove({}).then((result) => {
    console.log(result);
});

// It gets one, removes it and returns the removed item
// Todo.findOneAndRemove()

// It gets the item by ID, removes it and returns the removed item
Todo.findByIdAndRemove('5b3cc983c5b5cb125c26fb9f').then((todo) => {
    console.log('Deleted Todo is : ', todo);
}).catch((e) => {
    console.log(e);
});