const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({  
  comment:String,
  organization: String,
  deleted: {
      type: Boolean,
      index: true,
      default: false
    }
});
module.exports = mongoose.model('comment', CommentSchema);