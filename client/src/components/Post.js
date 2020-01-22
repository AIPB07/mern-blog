import React from 'react';
import './Post.css';
import { Link } from 'react-router-dom';
import { getFormattedDate } from '../helpers';

const Post = ( { post } ) =>
    <Link
        to={{
            pathname:"/post/" + post.id
        }}
    >
        <div className="post">
            <div className="title">{post.title}</div>
            <div className="dateAuthor">
                <div className="author">{post.author}</div>
                <div className="date">{getFormattedDate(post.date)}</div>
            </div>
        </div>
    </Link>

export default Post;