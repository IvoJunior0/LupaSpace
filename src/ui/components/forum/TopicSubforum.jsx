// Hooks
import { useState, useEffect } from "react"

// Componentes
import Loading from "../extras/Loading";
import Topic from "./Topic";

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
            <ul className="flex flex-col gap-4">
                {topicsList.map((topic) => (
                    <li key={topic.id}>
                        <Topic topic={topic}/>
                    </li>
                ))}
            </ul>
        </>
    )
}