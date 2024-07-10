import SidebarButton from "../buttons/SidebarButtons";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar(){
    return(
        <div className="flex flex-col border-r-4  bg-slate-50 row-start-2 row-end-3 gap-4 p-6 ">
            <SidebarButton text="Página Inicial" icon={faHouseChimney}/>
            <SidebarButton text="Seguindo" icon={faUser}/>
            <hr/>
            <SidebarButton text="Comunidades" icon={faFaceSmile}/>
        </div>
    );
}