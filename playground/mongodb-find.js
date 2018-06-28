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

    // db.collection('Todos').find().toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch', err);
    // });

    // db.collection('Todos').find({
    //     completed: false
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (err) => {
    //     console.log('Unable to fetch', err);
    // });

    db.collection('Todos').find({
        //_id: '5b33981ef3eecd13e1629295' // This wont work as _id is not a string it is an object. So we have to use OnjectID()
        _id: new ObjectID('5b3457f7dd246988aa6f44ad')
    }).toArray().then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch', err);
    });


    db.collection('Todos').find().count().then((count) => {
        console.log('Todos count ', count);
        
    }, (err) => {
        console.log('Unable to fetch', err);
    });


    db.collection('Users').find({
        name: 'Vipin'
    }).count().then((count) => {
        console.log('Users with name Vipin : ', count);
    }, (err) => {
        console.log('Unable to fetch', err);
    });


    
    client.close();

});