import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SidebarButton({text, icon}) {
    return(
        <>
            <button type="button" className="w-full text-gray-500 hover:bg-slate-300 p-3 rounded-md"><FontAwesomeIcon icon={icon} className="text-gray-500"/> {text}</button>
        </>
    );
}