const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// var id = '5b361ce6a55c395084a32c9211';

// if(!ObjectID.isValid(id)) {
//     console.log('id not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos',todos);
// }).catch((e) => {
//     console.log(e);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todos',todo);
// }).catch((e) => {
//     console.log(e);
// });



// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         console.log('id not found');
//     }
//     console.log('Todos',todo);
// }).catch((e) => {
//     console.log(e);
// });

var id = '5b35b430bd1514179c13a488';

console.log('User : ',User);

User.findById(id).then((user) => {
    if(!user) {
        console.log('User not found');
    }
    console.log('User',user);
}).catch((e) => {
    console.log(e);
});
