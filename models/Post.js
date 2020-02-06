const mongoose = require('mongoose');

// Create new schema
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    postImage: {
        type: String
    }
});

// Compile model from schema and export
const Post = mongoose.model('Post', PostSchema);
module.exports = Post;