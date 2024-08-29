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
            const querySnapshot = await getDocs(collection(db, "Forums"));
            setForums(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
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
                        <Forum props={forum}/>
                    </div>
                ))}
            </div>}
        </>
    );
}