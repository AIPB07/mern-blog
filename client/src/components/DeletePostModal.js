import React from 'react';
import { deletePost } from '../actions/postActions';
import '../styles/DeletePostModal';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader
} from 'reactstrap';

class DeletePostModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    confirmDelete = () => {
        console.log(this.props.postId);
        this.props.deletePost(this.props.postId);
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div>
                <Button 
                    className="custom-trash"
                    onClick={this.toggle}
                    title="Remove post"
                >
                    <i className="fas fa-times"></i>
                </Button>
                <Modal
                    isOpen={this.state.isOpen}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Delete post</ModalHeader>
                    <ModalBody>
                        <div style={{textAlign: 'center'}}>
                            Are you sure you want to delete the post: '{this.props.postTitle}'?
                        </div>
                        <div className="d-flex justify-content-around pt-3">
                            <Button 
                                onClick={this.confirmDelete}
                                color="light"
                            >
                                Yes
                            </Button>
                            <Button 
                                onClick={this.toggle}
                                color="dark"
                            >
                                No
                            </Button>
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

DeletePostModal.propTypes = {
    deletePost: PropTypes.func.isRequired
}

export default connect(
    null,
    { deletePost }
)(DeletePostModal);