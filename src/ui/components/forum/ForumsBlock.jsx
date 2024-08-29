import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import { getDocs, collection } from "firebase/firestore";

import Forum from "./Forum";
import Loading from "../extras/Loading";

export default function ForumBlocks() {
    const [forums, setForums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchForums = async () => {
            const forumsSnapshot = await getDocs(collection(db, "Forums"));
            const forumsWithSubforums = await Promise.all(
                forumsSnapshot.docs.map(async (forumDoc) => {
                    const forumData = forumDoc.data();
                    const forumId = forumDoc.id;

                    const subforumsSnapshot = await getDocs(
                        collection(db, `Forums/${forumId}/Subforums`)
                    );

                    const subforums = subforumsSnapshot.docs.map(subforumDoc => ({
                        ...subforumDoc.data(),
                        id: subforumDoc.id,
                    }));

                    return {
                        ...forumData,
                        id: forumId,
                        subforums,
                    };
                })
            );

            setForums(forumsWithSubforums);
            setLoading(false);
        };
        fetchForums();
    }, []);

    return (
        <>
            {loading ? <Loading/> :         
            <div className="flex flex-col gap-5">
                {forums.map((forum) => (
                    <div key={forum.id} className="">
                        <Forum forumData={forum} subforums={forum.subforums}/>
                    </div>
                ))}
            </div>}
        </>
    );
}