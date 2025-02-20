// Essa função serve tanto para projetos quanto para os tópicos dos fóruns

import { db } from "../config/firebase";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { mapFirestoreDocs } from "./mapFirestoreDocs";

export default async function getPosts(path, organizer, limitItems = 10, getFixed = false) {
    try {
        // Referência
        const postsRef = collection(db, path);

        // Organização e coleta dos tópicos
        const postsQuery = query(
            postsRef,
            ...(getFixed ? [where("fixed", "==", true)] : [orderBy(organizer, "desc"), limit(limitItems)])
        );
        
        return mapFirestoreDocs(postsQuery);
    } catch (error) {
        console.log(error); // Debug
        return [];
    }
}