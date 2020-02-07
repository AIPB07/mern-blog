import React from 'react';
import '../styles/Post';
import { Link } from 'react-router-dom';
import { getFormattedDate } from '../helpers';
import {
    Card,
    CardImg,
    CardBody,
    CardText,
    CardTitle,
    CardSubtitle,
    CardLink
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
                <CardImg top width="100%" src={imgURL} />
                <CardBody>
                    <CardTitle>{post.title}</CardTitle>
                    <CardSubtitle>By {post.author}</CardSubtitle>
                    <CardSubtitle>{getFormattedDate(post.date)}</CardSubtitle>
                    <div className="d-flex justify-content-between">
                        <Link
                            to={{
                                pathname: "/post/" + post.id
                            }}
                        >
                            View full post
                        </Link>
                        <DeletePostModal
                            postId={post.id}
                            postTitle={post.title} 
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default Post;