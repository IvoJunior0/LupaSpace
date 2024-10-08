import React from 'react'
import { useState, useEffect } from 'react';

import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '../../../config/firebase';
import Post from '../Project';
import FilterButton from '../buttons/FilterButton';

const getRecentPosts = async () => {
    try {
        const projectsRef = collection(db, "Projects");
        const projectsQuery = query(projectsRef, orderBy("createdAt", "desc"), limit(10));
        const projectsSnapshot = await getDocs(projectsQuery);
    
        const projects = projectsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    
        return projects;
    }
    catch (error) {
        console.error("Error fetching data RECENTPOSTS:", error);
    }
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
        <>
            <>
                <FilterButton selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
            </>
            <>
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
            </>
        </>
    )
}
