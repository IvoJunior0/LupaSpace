import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faEllipsis } from "@fortawesome/free-solid-svg-icons";

import Loading from "../ui/components/extras/Loading";
import addForumStyle from "../ui/components/extras/addForumStyle";

export default function CommunityPage() {
    const { communityID } = useParams();
    const [isFollowing, setIsFollowing] = useState(false);
    const [forumData, setForumData] = useState(null);
    const [id, setID] = useState("");
    const [forumStyles, setForumStyles] = useState({ backgroundColor: '', icon: faSpinner, textColor: '' });
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
        id ? setForumStyles(addForumStyle(id)) : null;
    }, [id]);

    if (loading) return <Loading/>

    if (!forumData) {
        return <div>Forum não encontrado</div>
    } else {
        document.title = `${forumData.name}`;
    }

    return(
        <>
            <div className="h-40 w-full relative">
                <div className={`h-28 w-full relative rounded-xl ${forumStyles.backgroundColor}`} />
                <div className="flex justify-around items-end absolute bottom-0 left-0 w-full">
                    <div className={`rounded-full border-white border-4 w-24 h-24 flex justify-center items-center ${forumStyles.backgroundColor}`}>
                        <FontAwesomeIcon icon={forumStyles.icon} className="text-white text-5xl"/>
                    </div>
                    <div>
                        <h1 className="text-2xl text-gray-500">Comunidade de <span className={forumStyles.textColor}>{forumData.name}</span></h1>
                    </div>
                    <div className="flex gap-4">
                        <button className={`self-center text-white py-1 px-3 rounded ${forumStyles.backgroundColor}`}>
                            {isFollowing ? "Sair" : "Juntar-se"}
                        </button>
                        <button>
                            <FontAwesomeIcon icon={faEllipsis} className="text-gray-500"/>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}