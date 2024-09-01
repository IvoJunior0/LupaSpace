import { useState, useEffect, useRef } from "react";
import useAuth from "../../../hooks/useAuth";
import Loading from "../extras/Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserMinus } from "@fortawesome/free-solid-svg-icons";

import { getDoc, doc, updateDoc, increment, arrayUnion, arrayRemove  } from "firebase/firestore";
import { db } from "../../../config/firebase";

export default function JoinCommunityButton({ backgroundColor, id }) {
    const [isFollowing, setIsFollowing] = useState(null);
    const [communitiesList, setCommunitiesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, loadingUser] = useAuth();
    const contentRef = useRef();

    useEffect(() => {
        // Não sei se esse foi o melhor jeito de fazer isso, mas tá funcionando
        if (!loadingUser) {
            const fetchCommunityList = async () => {
                try {
                    const userSnapshot = await getDoc(doc(db, "Users", user.uid));
                    const communities = userSnapshot.data().communities || [];
                    setCommunitiesList(communities);
                    setIsFollowing(communities.includes(id));
                    setLoading(false);
                } catch (error) {
                    console.log("Erro: ", error); // Debug
                }
            }
            fetchCommunityList();
        }
    }, [loadingUser, id, user]);

    const handleCommunity =  async () => {
        // ALgum dia eu mudo esse código pra alguma coisa mais bonita
        setLoading(true);
        if (!isFollowing) {
            try {
                const updatedCommunities = [...communitiesList, id];
                await updateDoc(doc(db, "Users", user.uid), {
                    communities: updatedCommunities
                });
                await updateDoc(doc(db, "Forums", id), {
                    members: arrayUnion(user.uid),
                    membersCount: increment(1)
                })
                setCommunitiesList(updatedCommunities);
                setIsFollowing(true);
            } catch (error) {
                console.log("Erro ao atualizar o documento: ", error); // Debug
            }
        } else {
            try {
                const updatedCommunities = communitiesList.filter(e => e !== id);
                await updateDoc(doc(db, "Users", user.uid), {
                    communities: updatedCommunities
                })
                await updateDoc(doc(db, "Forums", id), {
                    members: arrayRemove(user.uid),
                    membersCount: increment(-1)
                })
                setCommunitiesList(updatedCommunities);
                setIsFollowing(false);
            } catch (error) {
                console.log("Erro ao atualizar o documento: ", error); // Debug
            }
        }
        setLoading(false);
    }

    return(
        <button
            ref={contentRef}
            onClick={handleCommunity} 
            className={`text-white py-1 px-3 rounded ${backgroundColor}`}
        >
            {loading ? 
                <div className="inline-block h-5 w-5 animate-spin rounded-full border-[3px] border-solid border-white border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status"/>
            : 
            <>
                <div className="lg:hidden block">
                    <FontAwesomeIcon icon={isFollowing ? faUserMinus : faUserPlus}/>
                </div>
                <div className="lg:block hidden">
                    {loading ? (<Loading/>) : (isFollowing ? "Sair" : "Juntar-se")}
                </div>
            </>
            }
        </button>
    );
}