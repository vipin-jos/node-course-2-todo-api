var mongoose = require('mongoose');

//Telling Mongoose to use the built in Promise library as opposed to some third party one
mongoose.Promise = global.Promise;
// In heroku if we are using mLab MongoDB service, MONGODB_URI env variable will be set. If not use localhost one
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

// module.exports = {
//     mongoose: mongoose
// };
// ES6 above can be simplified as below
module.exports = {mongoose};
