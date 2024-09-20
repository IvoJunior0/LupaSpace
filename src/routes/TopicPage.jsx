import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import Loading from "../ui/components/extras/Loading";

import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function TopicPage() {
    const { topicID } = useParams();
    const location = useLocation();
    const [topicData, setTopicData] = useState({});
    const [authorData, setAuthorData] = useState({});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchTopicData = async () => {
            // Informações do tópico
            const splittedPath = location.pathname.split("/");
            const splicedPath = splittedPath.splice(2,3);

            const path = `Forums/${splicedPath[0]}/Subforums/${splicedPath[1]}/Topics`;

            const topicRef = doc(db, path, topicID);
            const topicDoc = await getDoc(topicRef);
            const data = topicDoc.data();

            topicDoc.exists() ? setTopicData(topicDoc.data()) : setMessage("Topico não encontrado");

            // Informações do autor
            const authorRef = doc(db, "Users", data.authorID);
            const authorSnapshot = await getDoc(authorRef);

            authorSnapshot.exists() ? setAuthorData(authorSnapshot.data()) : null;

            setLoading(false);
        }
        fetchTopicData();
    }, [topicID, location]);

    // Mudando o título da página
    (topicData && !loading) ? document.title = `${topicData.title}` : document.title = "Carregando...";

    if (loading) return <Loading/>;

    console.log(topicData)

    return (
        <div className="text-gray-500 p-4">
            <div className="">
                <h5>Por há</h5>
                <h1 className="">{topicData.title}</h1>
                <h2>{topicData.replyCount} respostas</h2>
                <h2>{topicData.viewCount} visualizações</h2>
                <hr />
                <p>{topicData.content}</p>
            </div>
        </div>
    );
}