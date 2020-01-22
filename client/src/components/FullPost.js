import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../actions/postActions';
import { getFormattedDate } from '../helpers';
import {
    Container,
    Row,
    Col
} from 'reactstrap';


class FullPost extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getPost(id);
    }

    render() {
        const formattedDate = getFormattedDate(this.props.currentPost.date);
        return (
            <div>
                <h1>{this.props.currentPost.title}</h1>
                <div>By {this.props.currentPost.author}</div>
                <div>{formattedDate}</div>
                <div>{this.props.currentPost.body}</div>
            </div>
        )
    }
}

FullPost.propTypes = {
    currentPost: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    currentPost: state.currentPost,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { getPost }
)
(withRouter(FullPost));