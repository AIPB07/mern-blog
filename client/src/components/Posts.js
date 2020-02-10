import React from 'react';
import Post from './Post.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../actions/postActions';
import { 
    CardDeck,
    CardGroup
} from 'reactstrap';


class Posts extends React.Component {

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        let loading;
        let error;
        let posts;
        if (this.props.errors.network) {
            error = <div>Error loading blog posts: {this.props.errors.network}</div>
        }
        if (this.props.loading) {
            loading = <img src="/img/loading.gif"></img>
        } else {
            posts = this.props.posts.map(post =>
                <Post
                    key={post._id}
                    post={post}
                />
                )
        }
        return (
            <div className="posts">
                <div className="d-flex justify-content-center">
                    {loading}
                    {error}
                </div>
                <CardDeck>
                    {posts}
                </CardDeck>
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
    posts: state.posts,
    loading: state.postsLoading
});


export default connect(
    mapStateToProps,
    { getPosts }
)(Posts);