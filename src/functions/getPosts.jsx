// Essa função serve tanto para projetos quanto para os tópicos dos fóruns

import { db } from "../config/firebase";
import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore";

export default async function getPosts(path, organizer, limitItems = 10, getFixed = false) {
    try {
        // Referência
        const postsRef = collection(db, path);

        // Organização e coleta dos tópicos
        const postsQuery = query(
            postsRef,
            ...(getFixed ? [where("fixed", "==", true)] : [orderBy(organizer, "desc"), limit(limitItems)])
        );
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