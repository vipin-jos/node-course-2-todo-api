var mongoose = require('mongoose');

//Telling Mongoose to use the built in Promise library as opposed to some third party one
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// module.exports = {
//     mongoose: mongoose
// };
// ES6 above can be simplified as below
module.exports = {mongoose};
