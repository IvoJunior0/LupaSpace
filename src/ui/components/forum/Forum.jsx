import React from "react";
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPython } from "@fortawesome/free-brands-svg-icons";
import { faDatabase, faWifi, faMicrochip, faHandshakeAngle } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import ForumData from "./ForumData";

export default function Forum({ props }) {
    const [isFollowing, setIsFollowing] = useState(false);
    const [memberCount, setMemberCount] = useState(0);
    
    return(
        <div className="p-5 border-2 border-slate-300 rounded-md grid grid-cols-[120px_1fr_120px_120px_120px] grid-rows-[50px_50px] gap-4 text-gray-500">
            <div className={`bg-${props.themeColor}-300 rounded-md row-span-2 flex justify-center items-center`}>
                <FontAwesomeIcon icon={faPython} className="text-white text-7xl"/>
            </div>
            <div className="flex gap-4">
                <h1 className="text-4xl">{props.name}</h1>
                <button className={`bg-${props.themeColor}-300 self-center text-white py-1 px-3 rounded`}>Juntar-se</button>
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