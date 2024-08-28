import { faPython } from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faWifi, faMicrochip, faHandshakeAngle, faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function addForumStyle(id) {
    const forumStylesMap = {
        programming: { backgroundColor: 'bg-yellow-400', textColor: 'text-yellow-400', icon: faPython },
        db: { backgroundColor: 'bg-indigo-400', textColor: 'text-indigo-400', icon: faDatabase },
        networks: { backgroundColor: 'bg-teal-400', textColor: 'text-teal-400', icon: faWifi },
        hardware: { backgroundColor: 'bg-rose-400', textColor: 'text-rose-400', icon: faMicrochip },
        help: { backgroundColor: 'bg-emerald-400', textColor: 'text-emerald-400', icon: faHandshakeAngle },
    };
    
    return forumStylesMap[id] || { backgroundColor: 'bg-gray-400', icon: faSpinner };
}