import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPython } from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faWifi, faMicrochip, faHandshakeAngle, faSpinner } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import ForumData from "./ForumData";

const forumStylesMap = {
    programming: { backgroundColor: 'bg-yellow-400', icon: faPython },
    db: { backgroundColor: 'bg-indigo-400', icon: faDatabase },
    networks: { backgroundColor: 'bg-teal-400', icon: faWifi },
    hardware: { backgroundColor: 'bg-rose-400', icon: faMicrochip },
    help: { backgroundColor: 'bg-emerald-400', icon: faHandshakeAngle },
};

const getForumStyles = (id) => {
    return forumStylesMap[id] || { backgroundColor: 'bg-gray-400', icon: faSpinner };
};

export default function Forum({ props }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [memberCount, setMemberCount] = useState(0);
    const [forumStyles, setForumStyles] = useState({ backgroundColor: '', icon: faSpinner });
    
    useEffect(() => {
        setForumStyles(getForumStyles(props.id));
    }, [props.id]);
    
    return(
        <div className="p-5 grid grid-cols-[110px_1fr_120px_120px_120px] grid-rows-[45px_45px] gap-4 text-gray-500 rounded-md bg-slate-100 border-4 hover:border-slate-300">
            <div className={`rounded-md row-span-2 flex justify-center items-center ${forumStyles.backgroundColor}`}>
                <FontAwesomeIcon icon={forumStyles.icon} className="text-white text-5xl"/>
            </div>
            <div className="flex gap-4 items-center">
                <h1 className="text-2xl">{props.name}</h1>
                <button className={`self-center text-white py-1 px-3 rounded ${forumStyles.backgroundColor}`}>{isFollowing ? "Sair -" : "Juntar-se +"}</button>
            </div>
            <div className="col-start-2 row-start-2 flex flex-wrap gap-1 text-sm -mt-1 items-start w-full max-w-80">
                {props.subforuns.map((subforum, index) => (
                    <div key={index}>
                        <p>{subforum}{index < (props.subforuns.length - 1) ? <span>,</span> : null}</p>
                    </div>
                ))}
            </div>
            <ForumData css={"col-start-3"} data={"Membros"} counter={props.membersCount}/>
            <ForumData css={"col-start-4"} data={"Tópicos"} counter={props.topicsCount}/>
            <ForumData css={"col-start-5"} data={"Postagens"} counter={props.postsCount}/>
        </div>
    );
}