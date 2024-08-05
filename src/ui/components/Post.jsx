import React from 'react'

export default function Post(props) {
    const post = props.post;
    return (
        <div>
            <h2>{post.titulo}</h2>
        </div>
    );
}