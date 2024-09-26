const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Posts"
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Comments = mongoose.model('Comments', commentSchema);
module.exports = { Comments }