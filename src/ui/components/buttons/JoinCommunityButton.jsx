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

    const handleCommunity =  async () => {
        switch(isFollowing){
            case false:
                communitiesList.push(id);
                const userRef = doc(db, "Users", user.uid);
                try {
                    await updateDoc(userRef, {
                        communities: communitiesList
                    })
                } catch (error) {
                    console.log("Erro ao atualizar o documento: ", error);
                }
                console.log("nao tá nela, mas agr táa ", communitiesList);
                setIsFollowing(true);
                break;
            case true:
                console.log("tá nela")
                break;
        }
    }

    useEffect(() => {
        if (!loadingUser) {
            setLoading(false);
            const fetchCommunityList = async () => {
                try {
                    const userSnapshot = await getDoc(doc(db, "Users", user.uid));
                    setCommunitiesList(userSnapshot.data().communities);
                    console.log(communitiesList.includes(id))
                    if (communitiesList.includes(id)) {
                        setIsFollowing(true);
                    } else {
                        setIsFollowing(false);
                    }
                    console.log(communitiesList);
                } catch (error) {
                    console.log("Erro: ", error);
                }
            }
            fetchCommunityList();
        } else {
            setLoading(true);
        }
    }, [loadingUser]);

    if (loading) return <Loading/>

    return(
        <button
            ref={contentRef}
            onClick={handleCommunity} 
            className={`self-center text-white py-1 px-3 rounded ${backgroundColor}`}
        >
            {isFollowing ? "Sair" : "Juntar-se"}
        </button>
    );
}