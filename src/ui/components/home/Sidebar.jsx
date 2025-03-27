import SidebarButton from "../buttons/SidebarButtons";

import { faHouseChimney, faUser, faFaceSmile } from "@fortawesome/free-solid-svg-icons";
/**
 * Barra de navegação da esquerda do site
 */
export default function Sidebar(){
    return(
        <div className="fixed w-[320px] top-[90px] h-full flex flex-col border-r-4 gap-4 p-6 max-[1199px]:hidden text-gray-500">
            <SidebarButton text="Página Inicial" icon={faHouseChimney} route="/"/>
            <SidebarButton text="Seguindo" icon={faUser} route="/seguindo"/>
        </div>
    );
}