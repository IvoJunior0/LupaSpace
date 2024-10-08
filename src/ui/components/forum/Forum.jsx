import { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";
import ForumData from "./ForumData";
import addForumStyle from "../extras/addForumStyle";
import JoinCommunityButton from "../buttons/JoinCommunityButton";

export default function Forum({ forumData, subforums }) {
    const [memberCount, setMemberCount] = useState(0);
    const [forumStyles, setForumStyles] = useState({ backgroundColor: '', icon: faSpinner });    
    
    useEffect(() => {
        setForumStyles(addForumStyle(forumData.id));
    }, [forumData.id]);
    
    return(
        <div className="p-5 grid grid-cols-[110px_1fr_100px_100px_100px] grid-rows-[45px_45px] gap-4 text-gray-500 rounded-md hover:bg-slate-100 border-4 hover:border-slate-300">
            <div className={`rounded-md row-span-2 flex justify-center items-center ${forumStyles.backgroundColor}`}>
                <FontAwesomeIcon icon={forumStyles.icon} className="text-white text-5xl"/>
            </div>
            <div className="flex gap-4 items-center">
                <Link to={`/comunidades/${forumData.id}`}><h1 className="text-2xl">{forumData.name}</h1></Link>
                <JoinCommunityButton backgroundColor={forumStyles.backgroundColor} id={forumData.id}/>
            </div>
            <div className="col-start-2 row-start-2 flex flex-wrap gap-1 text-sm -mt-1 items-start w-full max-w-96">
                {subforums.map((subforum, index) => (
                    <div key={index}>
                        <p>{subforum.name}{index < (subforums.length - 1) ? <span>,</span> : null}</p>
                    </div>
                ))}
            </div>
            <ForumData css={"col-start-3"} data={"Membros"} counter={forumData.membersCount}/>
            <ForumData css={"col-start-4"} data={"Tópicos"} counter={forumData.topicsCount}/>
            <ForumData css={"col-start-5"} data={"Postagens"} counter={forumData.postsCount}/>
        </div>
    );
}