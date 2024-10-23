// Hooks
import { useEffect, useState } from "react";

// Botão
import SidebarButton from "../buttons/SidebarButtons";

// Ícones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney, faUser, faFaceSmile } from "@fortawesome/free-solid-svg-icons";

import { auth, db } from "../../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import CommunityShortcut from "./CommunityShortcut";

export default function Sidebar(){
    const [userData, setUserData] = useState(null);
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                const userRef = doc(db, "Users", user.uid);
                const userSnapshot = await getDoc(userRef);
                if (userSnapshot.exists()) {
                    setUserData(userSnapshot.data());
                } else {
                    console.log("Usuario não existe"); // TODO: trocar por uma resposta visual
                }
            }
            fetchUserData();
        }
    }, []);

    return(
        <div className="fixed w-[320px] top-[90px] h-full flex flex-col border-r-4 bg-slate-50 gap-4 p-6 max-[1199px]:hidden text-gray-500">
            <SidebarButton text="Página Inicial" icon={faHouseChimney} route="/"/>
            <SidebarButton text="Seguindo" icon={faUser} route="/seguindo"/>
            <SidebarButton text="Comunidades" icon={faFaceSmile} route="/comunidades"/>
            <hr className="border-t-2"/>
            {user ? (<>
                <div>Suas Comunidades</div>
                <ul>
                    {userData?.communities.map((forum, index) => (
                        <li key={index}>
                            <CommunityShortcut id={forum}/>
                        </li>
                    ))}
                </ul>
            </>) : null}
        </div>
    );
}