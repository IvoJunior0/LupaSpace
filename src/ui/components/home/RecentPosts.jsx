import React from 'react'
import { useState, useEffect } from 'react';

import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import Post from '../Post';

const getRecentPosts = async () => {
    const postsRef = collection(db, "Posts");
    const q = query(postsRef, orderBy("createdAt", "asc"), limit(10));

    const querySnapshot = await getDocs(q);

    const posts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    return posts;
}

export default function RecentPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const recentPosts = await getRecentPosts();
            setPosts(recentPosts);
        };

        fetchPosts();
    }, [])

    console.log(posts);
    

    return (
        <div>
            {posts.length === 0 ? (
                <p>Sem nenhum post.</p>
            ) : (
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <Post post={post}/>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
