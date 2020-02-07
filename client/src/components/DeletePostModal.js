import React from 'react';
import { deletePost } from '../actions/postActions';
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
                <Button onClick={this.toggle}>
                    <i className="fas fa-trash-alt"></i>
                </Button>
                <Modal
                    isOpen={this.state.isOpen}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Delete post</ModalHeader>
                    <ModalBody>
                        <div>
                            Are you sure you want to delete the post: '{this.props.postTitle}'?
                        </div>
                        <Button onClick={this.confirmDelete}>
                            Yes
                        </Button>
                        <Button onClick={this.toggle}>
                            No
                        </Button>
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