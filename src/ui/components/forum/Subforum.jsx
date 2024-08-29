import { useEffect, useState } from "react";

import Loading from "../extras/Loading";

import { doc, getDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";

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

    if (loading) return (<Loading/>);

    return (
        <div className="grid grid-cols-2 grid-rows-1 bg-sky-800">
            {subForumData.name}
        </div>
    );
}