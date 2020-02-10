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
    DELETE_POST_FAIL,
} from '../actions/types';

const initialState = {
    posts: [],
    currentPost: {},
    postsLoading: false,
    submitLoading: false,
    errors: {}
};

const rootReducer = (state=initialState, action) => {
    switch (action.type) {
        case GET_POSTS_STARTED:
            return {
                ...state,
                postsLoading: true
            };
        case GET_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload,
                postsLoading: false,
                errors: {}
            };
        case GET_POSTS_FAIL:
            return {
                ...state,
                postsLoading: false,
                errors: action.payload.errors
            };
        case GET_POST_STARTED:
            return {
                ...state
            };
        case GET_POST_SUCCESS:
            return {
                ...state,
                currentPost: action.payload,
                errors: {}
            };
        case GET_POST_FAIL:
            return {
                ...state,
                errors: action.payload.errors
            };
        case ADD_POST_STARTED:
            return {
                ...state,
                submitLoading: true
            };
        case ADD_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.concat(action.payload),
                submitLoading: false,
                errors: {}
            };
        case ADD_POST_FAIL:
            return {
                ...state,
                submitLoading: false,
                errors: action.payload.errors
            };
        case DELETE_POST_STARTED:
            return {
                ...state
            }
        case DELETE_POST_SUCCESS:
            return {
                ...state,
                posts: state.posts.filter(item => item._id != action.payload.id)
            }
        case DELETE_POST_FAIL:
            return {
                ...state
            }
        default:
            return state;
    };
}

export default rootReducer;