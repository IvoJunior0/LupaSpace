import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import Loading from "../ui/components/extras/Loading";
import addForumStyle from "../ui/components/extras/addForumStyle";

export default function CommunityPage() {
    const { communityID } = useParams();
    const [forumData, setForumData] = useState(null);
    const [id, setID] = useState("");
    const [forumStyles, setForumStyles] = useState({ backgroundColor: '', icon: faSpinner });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCommunityData = async () => {
            try {
                const forumRef = doc(db, "Forums", communityID);
                const forumDoc = await getDoc(forumRef);
                if (forumDoc.exists()) {
                    setID(forumDoc.id);
                    setForumData(forumDoc.data());
                } else {
                    console.log("Forum não encontrado");
                }
            } catch (error) {
                console.log("Erro: ", error);
            } finally {
                setLoading(false);              
            }
        }
        fetchCommunityData();
    }, [communityID]);

    useEffect(() => {
        if (id) {
            setForumStyles(addForumStyle(id));
        }
    }, [id]);

    if (loading) return <Loading/>

    if (!forumData) {
        return <div>Forum não encontrado</div>
    } else {
        document.title = `${forumData.name}`;
    }

    return(
        <>
            <div className={`h-32 w-full relative ${forumStyles.backgroundColor}`}></div>
        </>
    );
}