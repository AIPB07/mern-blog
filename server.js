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

// Allow CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET, UPDATE'
        )
        return res.status(200).json({});
    }
    next();
});

// Routes
app.use('/api/posts', posts);

const port = 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));