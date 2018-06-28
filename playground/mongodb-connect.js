// const MongoClient = require('mongodb').MongoClient;
// Same of above
// const {MongoClient} = require('mongodb');
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

// Example of Object Destructuring feature of ES6
// var user = {name:'Vipin',age: 40};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=> {
    if(err) {
        return console.log('Unable to connect to MongoDB server');
    }
    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // },(err,result) => {
    //     if(err) {
    //         return console.log('Unable to insert todo', err)
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Vipin',
    //     age: 40,
    //     location: 'Thiruvananthapuram'
    // },(err, result) => {
    //     if(err) {
    //         return console.log('Could not add into Users collection',err);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    //     console.log(result.ops[0]._id);
    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    client.close();

});