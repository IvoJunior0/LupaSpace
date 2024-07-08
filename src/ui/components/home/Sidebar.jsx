import SidebarButton from "../buttons/SidebarButtons";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-solid-svg-icons";

export default function Sidebar(){
    return(
        <div className="flex flex-col border-r-4 w-80 bg-slate-50 col-span-1 row-span-6 gap-4 p-6 h-full">
            <SidebarButton text="Página Inicial" icon={faHouseChimney}/>
            <SidebarButton text="Seguindo" icon={faUser}/>
            <hr/>
            <SidebarButton text="Comunidades" icon={faFaceSmile}/>
        </div>
    );
}