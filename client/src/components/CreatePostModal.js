import React from 'react';
import {
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    FormText,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import '../styles/CreatePostModal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../actions/postActions';

const defaultState = {
    isOpen: false,
    title: "",
    author: "",
    body: "",
    postImage: null,
    errors: {}
};

class CreatePostModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = defaultState;
    };

    componentDidUpdate (prevProps) {
        const { errors } = this.props;
        // Prevent infinite loop
        if (prevProps.errors != errors) {
            this.setState({
                errors: errors
            });
            // Clear fields and close modal if form submitted succesfully
            if (!errors.title && !errors.author && !errors.body && !errors.file) {
                this.setState (defaultState);
            };
        };
    }

    handleSubmit = event => {
        event.preventDefault();

        let formData = new FormData();

        formData.append("title", this.state.title);
        formData.append("author", this.state.author);
        formData.append("body", this.state.body);
        formData.append("postImage", this.state.postImage);

        this.props.addPost(formData);
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    handleImageChange = event => {
        this.setState({
            postImage: event.target.files[0]
        })
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen,
            title: "",
            author: "",
            body: "",
            errors: {}
        })
    }

    render() {
        const { errors } = this.state;
        return (
            <div>
                <Button className="navbar-plus" onClick={this.toggle}>
                    <i className="fas fa-plus"></i>
                </Button>
                <Modal 
                    isOpen={this.state.isOpen} 
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>New post</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="title">Title</Label>
                                <Input 
                                    onChange={this.handleChange}
                                    type="text" 
                                    name="title" 
                                    id="title" 
                                    value={this.state.title}
                                />
                                <div className="input-error">{errors.title}</div>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="author">Author</Label>
                                <Input 
                                    onChange={this.handleChange}
                                    type="text" 
                                    name="author" 
                                    id="author"
                                    value={this.state.author} 
                                />
                                <div className="input-error">{errors.author}</div>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="body">Body</Label>
                                <Input 
                                    onChange={this.handleChange}
                                    type="textarea"
                                    name="body" 
                                    id="body"
                                    value={this.state.body}

                                />
                                <div className="input-error">{errors.body}</div>
                                <FormGroup>
                                    <Label htmlFor="image">Image</Label>
                                    <Input
                                        onChange={this.handleImageChange}
                                        type="file"
                                        name="image"
                                        id="image"
                                    />
                                    <div className="input-error">{errors.file}</div>
                                    <FormText color="muted">
                                        Optional. Must be .jpeg or .png and not exceed 5MB
                                    </FormText>
                                </FormGroup>
                            </FormGroup>
                            <Button className="custom-submit" type="submit">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

CreatePostModal.propTypes = {
    addPost: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
})

export default connect(
    mapStateToProps,
    { addPost }
)(CreatePostModal);