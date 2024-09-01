import { useEffect, useState } from "react"

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

import Loading from "../extras/Loading";
import { Link } from "react-router-dom";

export default function ForumMembers({ id }) {
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userSnapshot = await getDoc(doc(db, "Users", id));
                if (userSnapshot.exists()) {
                    setUserData(userSnapshot.data());
                } else {
                    console.log("O usuário não existe");
                }
                setLoading(false);
            } catch (error) {
                console.log("Erro: ", error);
            }
        }
        fetchUser();
    }, [id]);

    if (loading) return <Loading/>;

    return(
        <>
            {userData ? (
                <Link to={`/user/${id}`}>
                    <div className="flex flex-col justify-center gap-1 items-center bg-slate-100 rounded-lg p-5 border-[3px] hover:bg-slate-200">
                        {userData.pfp === null ? 
                            <FontAwesomeIcon icon={faCircleUser} className="text-5xl"/> : 
                            userData.pfp
                        }
                        <h1>{userData.name}</h1>
                        <h6>@{userData.username}</h6>
                    </div>
                </Link>
            ) : null}
        </>
    )
}