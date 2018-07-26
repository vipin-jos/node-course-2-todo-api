const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

/* 
{
    email: 'vip@gm.com,
    password: 'encrypted hash'
    tokens: [{
        access: 'auth',
        token: 'strong encrypted value that would be passed back and forth'
    }]
}

*/

var UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            //validator: validator.isEmail,
            // Same as below
            validator: (value) => {
                console.log(value);
                return validator.isEmail(value);
            },
            message: '{VALUE} is not a valid email id'
        } 
    },
    password: {
        type: String,
        required: true,
        minlength:6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// We can override methods to change how mongoose handles things by default
UserSchema.methods.toJSON = function() {
    var user = this;
    //toObject() is responsible for taking the mongoose variable ("user") and converting it into a regular variable
    var userObject = user.toObject();
    // Using lodash pick, only pick the required items from the userObject
    return _.pick(userObject, ['_id','email']);
};

// UserSchema.methods is an object and on this object you can add custom instance methods
// Also a regular function is used instead of arrow function is because we need to use the "this" keyword. 
// "this" keyword does not bind in arrow functions. So a regular method is used
UserSchema.methods.generateAuthToken = function() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access},'abc123').toString();
    // using ES6 shorthand - just "access" instead of  access: 'auth'
    user.tokens = user.tokens.concat([{access,token}]);
    // returning a promise so that in server.js we can do a then()
    return user.save().then(() => {
        return token;
    });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};