// Essa função serve tanto para projetos quanto para os tópicos dos fóruns

import { db } from "../config/firebase";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";

export default async function getPosts(path, organizer, limitItems = 10) {
    try {
        // Coletando dados
        const postsRef = collection(db, path);
        const postsQuery = query(postsRef, orderBy(organizer, "desc"), limit(limitItems));
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