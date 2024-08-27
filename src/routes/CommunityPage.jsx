import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loading from "../ui/components/extras/Loading";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export default function CommunityPage() {
    const { communityID } = useParams();
    const [forumData, setForumData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCommunityData = async () => {
            try {
                const forumRef = doc(db, "Forums", communityID);
                const forumDoc = await getDoc(forumRef);
                if (forumDoc.exists()) {
                    setForumData(forumDoc.data());
                } else {
                    console.log("Forum não encontrado");
                }
                setLoading(false)
            } catch (error) {
                console.log("Erro: ", error);
            }
        }
        fetchCommunityData();
    }, [communityID]);

    if (loading) return <Loading/>

    if (!forumData) {
        return <div>Forum não encontrado</div>
    } else {
        document.title = forumData.name;
    }

    return(
        <>
            <h1>aaaaa</h1>
        </>
    );
}