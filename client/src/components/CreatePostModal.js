import React from 'react';
import {
    Button,
    Form,
    FormGroup,
    Input,
    FormText,
    Label,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import '../styles/CreatePostModal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../actions/postActions';

class CreatePostModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            title: "",
            author: "",
            body: "",
            errors: {}
        };
    };

    componentDidUpdate (prevProps) {
        const { errors } = this.props;
        // Empty fields if post submitted successfully
        if (prevProps.errors != errors) {
            this.setState({
                errors: errors
            });
            if (!errors.title && !errors.author && !errors.body) {
                this.setState ({
                    title: "",
                    author: "",
                    body: "",
                    errors: {}
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
                            </FormGroup>
                            <Button type="submit">Submit</Button>
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