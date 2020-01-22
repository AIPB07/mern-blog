import {
    GET_POSTS_STARTED,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAIL,
    GET_POST_STARTED,
    GET_POST_SUCCESS,
    GET_POST_FAIL,
    ADD_POST_STARTED,
    ADD_POST_SUCCESS,
    ADD_POST_FAIL
} from '../actions/types';

const initialState = {
    posts: [],
    currentPost: {},
    loading: false,
    errors: {}
};

const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_POSTS_STARTED:
            return {
                ...state,
                loading: true
            };
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                loading: false,
                errors: {}
            };
        case GET_POSTS_FAIL:
            return {
                ...state,
                loading: false,
                errors: action.payload.errors
            };
        case GET_POST_STARTED:
            return {
                ...state,
                loading: true
            };
        case GET_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                currentPost: action.payload,
                errors: {}
            };
        case GET_POST_FAIL:
            return {
                ...state,
                loading: false,
                errors: action.payload.errors
            };
        case ADD_POST_STARTED:
            return {
                ...state,
                loading: true
            };
        case ADD_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.concat(action.payload),
                loading: false,
                errors: {}
            };
        case ADD_POST_FAIL:
            return {
                ...state,
                loading: false,
                errors: action.payload.errors
            };
        default:
            return state;
    };
}

export default rootReducer;