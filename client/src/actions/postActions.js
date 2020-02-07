import axios from 'axios';

import {
    GET_POSTS_STARTED,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAIL,
    GET_POST_STARTED,
    GET_POST_SUCCESS,
    GET_POST_FAIL,
    ADD_POST_STARTED,
    ADD_POST_SUCCESS,
    ADD_POST_FAIL,
    DELETE_POST_STARTED,
    DELETE_POST_SUCCESS,
    DELETE_POST_FAIL
} from '../actions/types';

// Configure axios
axios.defaults.baseURL = "http://localhost:5000";

// Get all posts
export const getPosts = () => dispatch => {
    dispatch(getPostsStarted());
    axios
        .get("/api/posts/posts")
        .then(res => dispatch(getPostsSuccess(res.data.posts)))
        .catch(err => dispatch(getPostsFail({network: err.message})));
}

// Get a single post by id
export const getPost = id => dispatch => {
    dispatch(getPostStarted());
    axios
        .get("/api/posts/post/"+id)
        .then(res => dispatch(getPostSuccess(res.data)))
        .catch(err => dispatch(getPostFail({network: err.message})));
}

// Add post
export const addPost = (formData) => dispatch => {
    dispatch(addPostStarted());
    console.log(formData);
    axios
        .post("/api/posts/new", formData)
        .then(res => dispatch(addPostSuccess(res.data)))
        .catch(err => {
            if (err.response) {
                dispatch(addPostFail(err.response.data));
            }
            console.log(err);
        });
}

// Delete post by id
export const deletePost = id => dispatch => {
    dispatch(deletePostStarted());
    axios
        .delete("/api/posts/delete/"+id)
        .then(res => dispatch(deletePostSuccess(id)))
        .catch(err => {
            console.log(err);
            dispatch(deletePostFail())
        });
}

const getPostsStarted = () => ({
    type: GET_POSTS_STARTED
});

const getPostsSuccess = posts => ({
    type: GET_POSTS_SUCCESS,
    payload: posts
});

const getPostsFail = errors => ({
    type: GET_POSTS_FAIL,
    payload: {
        errors
    }
});

const getPostStarted = () => ({
    type: GET_POST_STARTED
});

const getPostSuccess = post => ({
    type: GET_POST_SUCCESS,
    payload: post
});

const getPostFail = errors => ({
    type: GET_POST_FAIL,
    payload: {
        errors
    }
})

const addPostStarted = () => ({
    type: ADD_POST_STARTED
});

const addPostSuccess = post => ({
    type: ADD_POST_SUCCESS,
    payload: post
});

const addPostFail = errors => ({
    type: ADD_POST_FAIL,
    payload: {
        errors
    }
});

const deletePostStarted = () => ({
    type: DELETE_POST_STARTED
});

const deletePostSuccess = id => ({
    type: DELETE_POST_SUCCESS,
    payload: {
        id
    }
});

const deletePostFail = () => ({
    type: DELETE_POST_FAIL
})
