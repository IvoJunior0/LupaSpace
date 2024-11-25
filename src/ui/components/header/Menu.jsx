import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faFolder, faRightFromBracket, faUserPlus, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faToggleOff, faToggleOn, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import { auth } from "../../../config/firebase";

import { useState, useEffect, useRef} from "react";

export default function Menu({active}) {
    const user = auth.currentUser;

    async function logOut() {
        try {
            await auth.signOut();
            window.location.href = "/login";
        }
        catch (error) {}
    }

    useEffect(() => {
    })
    
    if (user) {
        return(
            // TODO: fazer os items funcionarem dps
            <ul className={`flex flex-col gap-4 fixed p-6 border-4 rounded-xl w-full sm:w-96 bg-slate-50 text-gray-500 top-[90px] transition-all duration-500 ${active ? 'right-0' : '-right-full'}`}>
                {/* TODO: fazer isso funcionar */}
                <li><a href="#"><FontAwesomeIcon icon={faFolder}></FontAwesomeIcon> Meus Projetos</a></li>
                <li><a href="#"><FontAwesomeIcon icon={faGear}></FontAwesomeIcon> Configurações</a></li>
                <li><button><FontAwesomeIcon icon={faSun}/>  <FontAwesomeIcon icon={faToggleOff}/> <FontAwesomeIcon icon={faMoon}/></button></li>
                <li><button onClick={logOut}><FontAwesomeIcon icon={faRightFromBracket}/> Sair</button></li>
            </ul>
        );
    }

    return(
        <ul className={`flex flex-col gap-4 fixed p-6 border-4 rounded-xl w-full sm:w-96 bg-slate-50 text-gray-500 top-[90px] transition-all ${active ? 'right-0' : '-right-full'}`}>
            <li><a href="#"><FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon> Cadastar-se</a></li>
            <li><a href="#"><FontAwesomeIcon icon={faRightToBracket}></FontAwesomeIcon> Login</a></li>
            <li><button><FontAwesomeIcon icon={faSun}/> <FontAwesomeIcon icon={faToggleOff}/> <FontAwesomeIcon icon={faMoon}/></button></li>
        </ul>
    );
}