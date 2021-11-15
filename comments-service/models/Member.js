const mongoose = require('mongoose');
const MemberSchema = new mongoose.Schema({  
login: String,
avatar: String,
followers: Number,
following: Number
});
module.exports = mongoose.model('Member', MemberSchema);