// npm Module called crypto-js
// SHA256 is a hashing algorithm
const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
    id: 10
};

var token = jwt.sign(data,'123abc');
console.log(token);
//jwt.io website - use it to view the header, data and signature


var decoded = jwt.verify(token,'123abc');
console.log('decoded',decoded);


//********************************************************************************************** */
// var message = 'I am user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data = {
//     id: 4
// };

// var token = {
//     data,
//     //'somesecret' is the salt. So even if the client rehashes it, since they dont know the salt, this hash will not be compromised
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }

// //hacker
// // token.data.id = 5;
// // token.hash = SHA256(5).toString();

// var resulthash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
// if(resulthash === token.hash) {
//     console.log('Hashes matches');
// } else {
//     console.log('Hashes does not match');
// }

// ALL THESE are implemented as JWT (JSON Web token) - npm i jsonwebtoken
//********************************************************************************************** */