const express = require('express');

// Validation functions
const validateCreatePost = require('../../validation/create-post');

// Post model
const Post = require('../../models/Post');

// Instantiate Router object
const router = express.Router();

// @route GET api/posts/posts
// @desc Get and return array of blog posts
// @access Public
router.get('/posts', (req, res) => {
    // Array to hold all posts
    let posts = [];
    // Object to hold a single post
    let post = {};
    // Find all posts
    Post.find({}).then(data => {
        data.forEach(item => {
            post.id = item._id;
            post.title = item.title;
            post.author = item.author;
            post.date = item.date;
            posts.push(post);
            post = {};
        })
        return res.status(200).json({posts});
    }).catch(err => res.status(500).json({errors: err}));
});

// @route GET api/posts/post
// @desc Get and return a single post by id
// @access Public
router.get('/post/:id', (req, res) => {
    // Get post id from URL
    const id = req.params.id;
    // Find post
    Post.findById(id).then(post => {
        return res.status(200).json(post);
    }).catch(err => res.status(500).json({errors: err}));
})

// @route POST api/posts/new
// @desc Create new post
// @access Public
router.post('/new', (req, res) => {
    // Validate input
    const {errors, isValid} = validateCreatePost(req.body);

    if (!isValid) {
        return res.status(400).json(errors)
    } else {
        // Create new post document
        const newPost = new Post({
            title: req.body.title,
            author: req.body.author,
            body: req.body.body,
            date: Date.now()
        });
        // Save document in database
        newPost
            .save()
            .then(post => res.status(200).json(post))
            .catch(err => console.log(err))
    }
});

module.exports = router;