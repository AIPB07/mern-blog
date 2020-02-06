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
                    <CardSubtitle>By {post.author} {getFormattedDate(post.date)}</CardSubtitle>
                    <Link
                        to={{
                            pathname:"/post/" + post.id
                        }}
                    >
                        <CardText>View full post</CardText>
                    </Link>
                </CardBody>
            </Card>
        </div>
    )
}

export default Post;