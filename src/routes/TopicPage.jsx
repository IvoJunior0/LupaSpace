import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import Loading from "../ui/components/extras/Loading";

import { db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function TopicPage() {
    const { topicID } = useParams();
    const location = useLocation();
    const [topicData, setTopicData] = useState({});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const fetchTopicData = async () => {
            const splittedPath = location.pathname.split("/");
            const splicedPath = splittedPath.splice(2,3);

            const path = `Forums/${splicedPath[0]}/Subforums/${splicedPath[1]}/Topics`;

            const topicRef = doc(db, path, topicID);
            const topicDoc = await getDoc(topicRef);

            topicDoc.exists() ? setTopicData(topicDoc.data()) : setMessage("Topico não encontrado")
        }
        fetchTopicData();
    }, [topicID, location]);

    console.log(topicData)

    return (
        <>
            <div className="">
                <h1 className="">{topicData.title}</h1>
            </div>
        </>
    );
}