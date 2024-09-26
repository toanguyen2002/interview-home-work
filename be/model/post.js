const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    title: {
        type: String,
        trim: true
    },
    content: {
        type: String,
        trim: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    tags: {
        type: Array,
        default: []
    },
});

const Posts = mongoose.model('Posts', postSchema);
module.exports = { Posts }