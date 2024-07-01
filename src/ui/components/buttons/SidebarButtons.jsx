import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function SidebarButton({text}) {
    return(
        <>
            <button type="button" className="w-full hover:bg-slate-300">{text}</button>
        </>
    );
}