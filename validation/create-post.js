const isEmpty = require('is-empty');

module.exports = (data) => {
    let errors = {};
    
    // Convert empty fields to empty strings
    data.title = isEmpty(data.title) ? "" : data.title;
    data.author = isEmpty(data.author) ? "" : data.author;
    data.body = isEmpty(data.body) ? "" : data.body;

    // Validate fields
    if (!data.title) {
        errors.title = "Title is required";
    }
    if (!data.author) {
        errors.author = "Author is required";
    }
    if (!data.body) {
        errors.body = "Body is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}