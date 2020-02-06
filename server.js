const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const mongoURI = require('./config/keys');
const posts = require('./routes/api/posts');

// Initialise express app
const app = express();

// Make 'uploads' static/publicly available
app.use('/uploads', express.static('uploads'));
// Set app to use bodyParser middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Successfully connected to MongoDB'))
.catch(err => console.log(err));

// Routes
app.use('/api/posts', posts);

const port = 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));