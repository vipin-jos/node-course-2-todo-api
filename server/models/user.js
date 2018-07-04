var mongoose = require('mongoose');

var Users = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
});

module.export = {Users};

