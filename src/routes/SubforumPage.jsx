import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";

import Loading from "../ui/components/extras/Loading";
import addForumStyle from "../ui/components/extras/addForumStyle";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faSpinner, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

export default function SubforumPage() {
    const { subforumID } = useParams();
    const location = useLocation();
    const [subforumData, setSubforumData] = useState(null);
    const [reference, setReference] = useState("");
    const [forumData, setForumData] = useState(null);
    const [forumID, setForumID] = useState("");
    const [id, setID] = useState("");
    const [forumStyles, setForumStyles] = useState({ backgroundColor: '', icon: faSpinner, textColor: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCommunityData = async () => {
            // Formatando o path pro firestore
            const splittedPath = location.pathname.split("/");
            const splicedPath = splittedPath.splice(2,3);

            setForumID(splicedPath[0]);
            const path = `Forums/${splicedPath[0]}/Subforums`;

            const subforumRef = doc(db, path, subforumID);
            const subforumDoc = await getDoc(subforumRef);

            if (subforumDoc.exists()) {
                // Subforum data
                setSubforumData(subforumDoc.data());
                setReference(`${subforumRef.path}/Topics`);

                // Forum data
                const forumDoc = await getDoc(doc(db, "Forums", splicedPath[0]));
                setForumData(forumDoc.data());
            }
            setLoading(false);
        }
        fetchCommunityData();
    }, []);

    useEffect(() => {
        forumID ? setForumStyles(addForumStyle(forumID)) : null;
    }, [forumID]);

    if (loading) return <Loading/>;

    !subforumData ? <div>Sala não encontrada</div> : (document.title = `Sala de ${subforumData.name}`);

    const isParentRoute = location.pathname === `/comunidades/${forumID}/${subforumID}`;

    return(
        <>
            
            {/* Banner */}
            <div className="h-40 w-full relative">
                <div className={`h-28 w-full relative rounded-xl ${forumStyles.backgroundColor}`} />
                <div className="flex justify-around items-end absolute bottom-0 left-0 w-full">
                    <div className={`rounded-full border-white border-4 w-24 h-24 flex justify-center items-center ${forumStyles.backgroundColor}`}>
                        <FontAwesomeIcon icon={forumStyles.icon} className="text-white text-5xl"/>
                    </div>
                    <div>
                        <h1 className={`text-2xl text-gray-500`}>Sala de <span className={forumStyles.textColor}>{subforumData.name}</span></h1>
                    </div>
                    <div>
                        {isParentRoute ? (
                        <Link to={`${location.pathname}/postar?subforumID=${subforumID}&forumID=${forumID}`}>
                            <FontAwesomeIcon icon={faCirclePlus} className={`text-2xl ${forumStyles.textColor}`}/>
                        </Link>
                        ) : (
                            null
                        )}
                    </div>
                </div>
            </div>
            {/* Hyperlinks */}
            <div className="flex gap-2 text-gray-500 w-full">
                <h3 className="flex gap-2 flex-wrap">
                    <Link to={"/comunidades"} className="hover:underline">
                        Comunidades
                    </Link>
                    <span>{">"}</span>
                    <Link to={`/comunidades/${forumID}`} className="hover:underline">
                        {forumData.name}
                    </Link>
                    <span>{">"}</span>
                    {isParentRoute ? <span className={forumStyles.textColor}>{subforumData.name}</span> : (<>
                        <Link to={`/comunidades/${forumID}/${subforumID}`} className="hover:underline">
                            <span>{subforumData.name}</span>
                        </Link>
                        <span>{">"}</span>
                        <span className={`${forumStyles.textColor}`}>Criar tópico</span>
                    </>)}
                </h3>
            </div>
            {isParentRoute ? (<>
                {/* Tópicos fixados */}
                <div className="flex flex-col gap-4">
                    <hr className="border-t-2"/>
                    <div className="text-gray-500 mt-1 pb-3">
                        <h1>Tópicos fixados</h1>
                    </div>
                </div>
                {/* Tópicos recentes */}
                <div className="flex flex-col gap-4">
                    <hr className="border-t-2"/>
                    <div className="text-gray-500 mt-1 pb-3">
                        <h1>Tópicos recentes</h1>
                    </div>
                </div>
            </>) : (
                <Outlet/>
            )}
        </>
    );
}