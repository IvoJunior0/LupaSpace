import { useEffect, useState } from "react";

import Loading from "../extras/Loading";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { Link } from "react-router-dom";

export default function Subforum({ subforumId, communityId }) {
    const [subForumData, setSubForumData] = useState({}); 
    const [loading, setLoading] = useState(true);

    const getSubforumData = async (communityId, subforumId) => {
        try {
            const subforumRef = doc(db, `Forums/${communityId}/Subforums`, subforumId);
            const subforumSnapshot = await getDoc(subforumRef);
            if (subforumSnapshot.exists()) {
                setSubForumData(subforumSnapshot.data());
                setLoading(false);
            } else {
                console.log("O documento não existe");
            }
        } catch (err) {
            console.log("Erro ao carregar as subcomunidades: ", err);
        }
    }

    useEffect(() => {
        if (communityId && subforumId) {
            getSubforumData(communityId, subforumId);
        }
    }, [communityId, subforumId]);

    if (loading) return <Loading/>;

    return (
        <div className="grid grid-cols-2 grid-rows-1 p-6 border-slate-300 border-[3px] border-l-[16px] rounded-lg text-gray-500 transition-all hover:border-l-[32px]">
            <div>
                <Link to={`${subforumId}`}>{subForumData.name}</Link>
            </div>
            <div>
                Tópico
            </div>
        </div>
    );
}