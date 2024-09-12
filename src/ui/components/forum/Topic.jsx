import { useState, useEffect } from "react"

import Loading from "../extras/Loading";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { faCheck, faLock, faQuestion, faEllipsis } from "@fortawesome/free-solid-svg-icons";

import { db } from "../../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

const topicIconMapping = (state) => {
    switch (state) {
        case "aberto": return faComments;
        case "fechado": return faLock;
        case "resolvido": return faCheck;
    }
    return faQuestion;
}

export default function Topic({ topic }) {
    const [authorData, setAuthorData] = useState(null);
    const [topicIcon, setTopicIcon] = useState(faQuestion);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const userDoc = await getDoc(doc(db, "Users", topic.authorID));
            if (userDoc) {
                setAuthorData(userDoc.data());
            } else {
                console.log("Usuário não existe"); // Debug
            }
            setLoading(false);
        }
        fetchUserData();
        setTopicIcon(topicIconMapping(topic.status))
    }, [topic, topicIcon]);

    if (loading) return <Loading/>

    return (
        <>
            <div className="grid grid-cols-[60px_1fr_250px_250px_auto_auto] grid-rows-2 p-3.5 border-[3px] border-slate-200 rounded text-gray-500">
                <div className="row-span-2 self-center justify-self-center	">
                    <FontAwesomeIcon icon={topicIcon} />
                </div>
                <div className="row-span-2">
                    <h1>{topic.title}</h1>
                    <h1>Por <Link to={`/user/${topic.authorID}`} className="hover:underline">{authorData.name}</Link></h1>
                </div>
                <div className="row-span-2">
                    {/* Debug */}
                    <h1>{topic.replyCount} publicações</h1>
                    <h1>{topic.viewCount} views</h1>
                </div>
                <div className="row-span-2">
                    {/* Debug */}
                    <h1>Ultima respota por fulano</h1>
                    <h1>há x horas</h1>
                </div>
                <div>
                    <button>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                </div>
            </div>
        </>
    )
}