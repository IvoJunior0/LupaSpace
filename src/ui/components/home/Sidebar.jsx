// Botão
import SidebarButton from "../buttons/SidebarButtons";

// Ícones
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar(){
    return(
        <div className="flex flex-col border-r-4 bg-slate-50 row-start-2 row-end-3 gap-4 p-6 max-[1199px]:hidden">
            <SidebarButton text="Página Inicial" icon={faHouseChimney} route="/"/>
            <SidebarButton text="Seguindo" icon={faUser} route="/seguindo"/>
            <hr/>
            <SidebarButton text="Comunidades" icon={faFaceSmile} route="/comunidades"/>
        </div>
    );
}