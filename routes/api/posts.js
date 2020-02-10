const express = require('express');

// Validation functions
const validateCreatePost = require('../../validation/create-post');

// Post model
const Post = require('../../models/Post');

// Instantiate Router object
const router = express.Router();

// Middleware for parsing form data
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(new Error('Invalid file type'), false)
    }
}
const upload = multer({
    storage: storage, 
    limits: {
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});
const postImageUpload = upload.single('postImage');

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
            post.postImage = item.postImage;
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
    let fileError = '';
    postImageUpload(req, res, function(err) {
        if (err) {
            if (err.message) {
                fileError = err.message;
            } else {
                fileError = 'Invalid file type';
            }
        }
        if (!req.file) {
            fileError = 'Image is required';
        }
        // Validate text inputs
        const { errors, isValid } = validateCreatePost(req.body);
        if (!isValid || fileError) {
            errors.file = fileError;
            return res.status(400).json(errors);
        } else {
            // Create new post document
            const newPost = new Post({
                title: req.body.title,
                author: req.body.author,
                body: req.body.body,
                date: Date.now(),
                postImage: req.file.path
            });
            // Save document in database
            newPost
                .save()
                .then(post => res.status(200).json(post))
                .catch(err => console.log(err))
        }
    })    
});

// @route DELETE api/posts/delete
// @desc Delete a post by id
// @access Public
router.delete('/delete/:id', (req, res) => {
    // Remove post
    Post.deleteOne({ _id: req.params.id })
    .then(result => res.status(200).json({deleted: result.deletedCount}))
    .catch(err => console.log(err))
});

module.exports = router;