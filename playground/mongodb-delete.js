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

    //deleteMany
    // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
    //     console.log(`deleted many ${result}`)
    // });
    //deleteOne
    // db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
    //     console.log(result);
    // });
    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });

    // db.collection('Users').deleteMany({name: 'Vipin'}).then((result) => {
    //     console.log(result);
    // });
    db.collection('Users').findOneAndDelete({_id: new ObjectID('5b339b294f0fbd1597863108')}).then((result) => {
        console.log(result);
    });
    
    client.close();

});