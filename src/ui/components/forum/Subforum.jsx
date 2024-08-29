import { doc, getDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useEffect, useState } from "react";

export default function Subforum({ subforumId, communityId }) {
    const [subForumData, setSubForumData] = useState(null);    

    const getSubforumData = async (communityId, subforumId) => {
        try {
            const subforumRef = doc(db, `Forums/${communityId}/Subforums`, subforumId);
            const subforumSnapshot = await getDoc(subforumRef);
            if (subforumSnapshot.exists()) {
                setSubForumData(subforumSnapshot.data());
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

    return (
        <div className="grid grid-cols-2 grid-rows-1 bg-sky-800">
            {subForumData.name}
        </div>
    );
}