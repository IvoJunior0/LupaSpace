import { useEffect, useState } from "react";
import { db } from "../../../config/firebase";
import { getDocs, collection } from "firebase/firestore";

import Forum from "./Forum";

export default function ForumBlocks() {
    const [forums, setForums] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchForums = async () => {
            const querySnapshot = await getDocs(collection(db, "Forums"));
            setForums(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };

        fetchForums();
    }, []);

    return (
        <div className="">
            {forums.map((forum) => (
                <div key={forum.id} className="">
                    <p>{forum.name}</p>
                </div>
            ))}
        </div>
    );
}