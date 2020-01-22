import React from 'react';
import Post from './Post.js';
import './Posts.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../actions/postActions';


class Posts extends React.Component {

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        return (
            <div className="posts">
                <div>{this.props.errors.network}</div>
                {this.props.posts.map(post =>
                <Post
                    key={post.id}
                    post={post}
                />
                )}
            </div>
        )
    }
}

Posts.propTypes = {
    errors: PropTypes.object.isRequired,
    posts: PropTypes.array.isRequired,
    getPosts: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    posts: state.posts
});


export default connect(
    mapStateToProps,
    { getPosts }
)(Posts);