import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import {
    Col,
    Row
} from 'reactstrap';
import { getPost } from '../actions/postActions';
import { getFormattedDate } from '../helpers';
import '../styles/FullPost';


class FullPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            title: '',
            body: '',
            date: ''
        }
        
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getPost(id);
    }

    componentDidUpdate(prevProps) {
        if (this.props != prevProps) {
            this.setState ({
                author: this.props.currentPost.author,
                title: this.props.currentPost.title,
                body: this.props.currentPost.body,
                date: this.props.currentPost.date,
                imgURL: this.props.currentPost.postImage
            });
        };
    }

    render() {
        const formattedDate = getFormattedDate(this.state.date);
        return (
            <Row className="post-content">
                <Col xs="3" />
                <Col xs="6">
                    <h1>{this.state.title}</h1>
                    <Row>
                        <Col xs="2" />
                        <Col xs="8">
                            <div className="d-flex justify-content-between">
                                <div className="author">By {this.state.author}</div>
                                <div className="date">{formattedDate}</div>
                            </div>
                        </Col>
                        <Col xs="2" />
                    </Row>
                    <img className="img-fluid" src={'http://localhost:5000/' + this.state.imgURL}></img>
                    <ReactMarkdown source={this.state.body} />
                </Col>
                <Col xs="3" />
            </Row>
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