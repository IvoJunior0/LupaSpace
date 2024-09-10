// Essa função serve tanto para projetos quanto para os tópicos dos fóruns

import { db } from "../config/firebase";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";

export default async function getPosts(path, organizer, limitItems = 10, getFixed = false) {
    try {
        let postsQuery;

        const postsRef = collection(db, path);

        // Organização e coleta dos tópicos
        if (!getFixed) {
            postsQuery = query(postsRef, orderBy(organizer, "desc"), limit(limitItems));
        } else {
            postsQuery = query(postsRef, where("fixed", "==", true));
        }
        const postsSnapshot = await getDocs(postsQuery);

        // Armazenando em uma lista
        const posts = postsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return posts; // Retornando a lista 
    } catch (error) {
        console.log(error); // Debug
        return [];
    }
}