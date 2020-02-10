import React from 'react';
import '../styles/Post';
import { Link } from 'react-router-dom';
import { getFormattedDate } from '../helpers';
import {
    Card,
    CardImg,
    CardBody,
    CardTitle,
    CardSubtitle,
} from 'reactstrap';
import DeletePostModal from './DeletePostModal';

function Post( { post } ) {
    let imgURL;
    if (post.postImage) {
        imgURL = 'http://localhost:5000/' + post.postImage;
    } else {
        imgURL = 'img/orange.jpg';
    }
    return (
        <div className="post">
            <Card>
                <Link
                    className="card-link"
                    to={{
                        pathname: "/post/" + post._id
                    }}
                >
                    <CardImg top width="100%" src={imgURL} />
                </Link>
                <CardBody>
                    <CardTitle>{post.title}</CardTitle>
                    <div className="d-flex justify-content-between">
                        <CardSubtitle>By {post.author}</CardSubtitle>
                        <DeletePostModal
                            postId={post._id}
                            postTitle={post.title} 
                        />
                    </div>
                    <CardSubtitle>{getFormattedDate(post.date)}</CardSubtitle>
                </CardBody>
            </Card>
        </div>
    )
}

export default Post;