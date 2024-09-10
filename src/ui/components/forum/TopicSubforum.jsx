// Hooks
import { useState, useEffect } from "react"

// Firebase
import { getDocs, collection, query, orderBy, limit } from "firebase/firestore";
import { db } from "../../../config/firebase";

// Componentes
import Loading from "../extras/Loading";

// Funções
import getPosts from "../../../functions/getPosts";

export default function TopicSubforum({ recentTopic, path }) {
    const [topicsList, setTopicsList] = useState([]);
    const [loading, setLoading] = useState(true);
    let parameters = [path, "createdAt", 10];

    useEffect(() => {
        const fetchTopics = async (path, order, limiter, fixed) => {
            const posts = await getPosts(path, order, limiter, fixed);
            setTopicsList(posts);
            setLoading(false);
        }
        
        if (recentTopic) {
            fetchTopics(...parameters);
        } else {
            parameters.push(true);
            fetchTopics(...parameters);
        }
    }, [recentTopic, path])

    if (loading) return <Loading/>;

    return (
        <>
            <ul>
                {topicsList.map((topic) => (
                    <li key={topic.id}>{topic.title}</li>
                ))}
            </ul>
        </>
    )
}