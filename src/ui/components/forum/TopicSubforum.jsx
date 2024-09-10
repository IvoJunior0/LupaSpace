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

    useEffect(() => {
        const fetchTopics = async (path, order, limiter) => {
            const posts = await getPosts(path, order, limiter);
            setTopicsList(posts);
            setLoading(false);
            console.log(topicsList)
        }
        if (recentTopic) {
            fetchTopics(...[path, "createdAt", 10]);
        }
    }, [recentTopic, path])

    if (loading) return <Loading/>;

    return (
        <>
            <ul>
                {topicsList.map((topic) => (
                    <li key={topic.id}>{topic.status}</li>
                ))}
            </ul>
        </>
    )
}