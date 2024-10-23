import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import Loading from "../ui/components/extras/Loading";

import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faComment, faEye } from "@fortawesome/free-solid-svg-icons";

import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

import parse from 'html-react-parser';

function formatTimeAgo(timestampSeconds) {
    const convertedDate = new Date(timestampSeconds * 1000);
    const timeAgoFormated = formatDistanceToNow(convertedDate, { includeSeconds: true, locale: ptBR});
    return timeAgoFormated;
}

export default function TopicPage() {
    const { topicID } = useParams();
    const location = useLocation();
    const [topicData, setTopicData] = useState({});
    const [authorData, setAuthorData] = useState({});
    const [authorID, setAuthorID] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    let timeAgo;

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
            setAuthorID(data.authorID);

            setLoading(false);
        }
        fetchTopicData();
    }, [topicID, location]);

    // Mudando o título da página
    (topicData && !loading) ? document.title = `${topicData.title}` : document.title = "Carregando...";

    if (loading) {
        return <Loading/>
    } else {
        timeAgo = formatTimeAgo(topicData.createdAt.seconds);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <div className="text-gray-500 p-4">
            {/* Header */}
            <div className="">
                <div className="grid grid-cols-[1fr_auto] grid-rows-[auto_auto] p-2.5">
                    <div className="">
                        <h1 className="text-2xl hover:underline hover:cursor-pointer">{topicData.title}</h1>
                    </div>
                    <h5 className="text-sm">
                        Por <Link 
                                to={`/user/${authorID}`} 
                                className="hover:underline">
                                    {authorData.name}
                            </Link> há {timeAgo}
                    </h5>
                    <div className="row-span-2 col-start-2 row-start-1">
                        <h2>{topicData.replyCount} <FontAwesomeIcon icon={faComment}/></h2>
                        <h2>{topicData.viewCount} <FontAwesomeIcon icon={faEye}/></h2>
                    </div>
                </div>
            </div>
            {/* Content */}
            <div className="py-5 px-3">
                <p>{parse(topicData.content)}</p>
            </div>
            <hr />
            {/* Respostas */}
            <div className="py-5">
                <h1>Nenhuma resposta ainda...</h1>
            </div>
            {/* Fazer respotas */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <textarea 
                    placeholder="Sua resposta" 
                    className="block resize-none w-full min-h-44 p-2.5 bg-slate-100 border-slate-300 border-2 rounded-md focus:outline-none focus:border-slate-400" 
                    required
                />
                <div className="self-end">
                    <button type="submit" className="text-white py-2 px-4 rounded bg-green-600 hover:bg-green-500">Publicar</button>
                </div>
            </form>
        </div>
    );
}