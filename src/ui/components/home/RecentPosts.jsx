import React from 'react'
import { useState, useEffect } from 'react';

import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import Post from '../Post';
import FilterButton from '../buttons/FilterButton';

const getRecentPosts = async () => {
    const postsRef = collection(db, "Posts");
    const q = query(postsRef, orderBy("createdAt", "desc"), limit(10));

    const querySnapshot = await getDocs(q);

    const posts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    return posts;
}

export default function RecentPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const applyFilter = (posts, selectedFilters) => {
        if (selectedFilters === 0) return posts;
        return posts.filter(post =>
            selectedFilters.every(tag => post.tags?.includes(tag))
        );
    }

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const recentPosts = await getRecentPosts();
                const filteredPosts = applyFilter(recentPosts, selectedFilters);
                setPosts(filteredPosts);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [selectedFilters]);
    
    return (
        <div>
            <div className="">
                <FilterButton selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
            </div>
            <div>
                {posts.length === 0 ? (
                    loading ? <p>Carregando...</p> : <p>Nenhum post encontrado.</p>
                ) : (
                    <ul className='flex flex-col gap-6'>
                        {posts.map(post => (
                            <li key={post.id}>
                                <Post post={post}/>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}
