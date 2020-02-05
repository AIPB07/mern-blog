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

const Post = ( { post } ) =>
    // <Link
    //     to={{
    //         pathname:"/post/" + post.id
    //     }}
    // >
    //     <div className="post">
    //         <div className="title">{post.title}</div>
    //         <div className="dateAuthor">
    //             <div className="author">{post.author}</div>
    //             <div className="date">{getFormattedDate(post.date)}</div>
    //         </div>
    //     </div>
    // </Link>
    <div className="post">
        <Card>
            <CardImg top width="100%" src="/img/orange.jpg" />
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

export default Post;