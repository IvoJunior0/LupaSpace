import { useState, useEffect, useRef } from "react";
import useAuth from "../../../hooks/useAuth";
import Loading from "../extras/Loading";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserMinus } from "@fortawesome/free-solid-svg-icons";

import { getDoc, doc, updateDoc } from "firebase/firestore";
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
                } catch (error) {
                    console.log("Erro: ", error); // Debug
                }
            }
            fetchCommunityList();
        } else {
            setLoading(false)
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
                setCommunitiesList(updatedCommunities);
                setIsFollowing(false);
            } catch (error) {
                console.log("Erro ao atualizar o documento: ", error); // Debug
            }
        }
        setLoading(false);
    }

    if (loading) return <Loading/>

    return(
        <button
            ref={contentRef}
            onClick={handleCommunity} 
            className={`self-center text-white py-1 px-3 rounded ${backgroundColor}`}
        >
            {loading ? (<Loading/>) : (isFollowing ? "Sair" : "Juntar-se")}
        </button>
    );
}