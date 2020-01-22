import React from 'react';
import './CreatePost.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../actions/postActions';

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            author: "",
            body: ""
        };
    }

    componentDidUpdate (prevProps) {
        const { errors } = this.props;
        // Empty fields if post submitted successfully
        if (prevProps.errors != errors) {
            if (!errors.title && !errors.author && !errors.body) {
                this.setState ({
                    title: "",
                    author: "",
                    body: ""
                });
            };
        };
    }

    handleSubmit = event => {
        event.preventDefault();

        const postData = {
            title: this.state.title,
            author: this.state.author,
            body: this.state.body
        };

        this.props.addPost(postData);
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    render() {
        const { errors } = this.props;
        return (
            <div className="createpost">
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input 
                        onChange={this.handleChange} 
                        value={this.state.title} 
                        className="inputfield" 
                        id="title"
                        error={errors.title}
                    />
                    <div>{errors.title}</div>
                    <label htmlFor="author">Author</label>
                    <input 
                        onChange={this.handleChange} 
                        value={this.state.author} 
                        className="inputfield" 
                        id="author"
                        error={errors.author}
                    />
                    <div>{errors.author}</div>
                    <label htmlFor="body">Body</label>
                    <textarea 
                        onChange={this.handleChange} 
                        value={this.state.body} 
                        className="inputfield" 
                        id="body"
                        error={errors.body}
                    />
                    <div>{errors.body}</div>
                    <button type="submit">Post</button>
                </form>
            </div>
        )
    }
}

CreatePost.propTypes = {
    addPost: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired

}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { addPost }
)(CreatePost);