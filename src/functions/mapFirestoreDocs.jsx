import { getDocs } from "firebase/firestore";

/**
 * Converte um QuerySnapshot do Firestore em um array de objetos formatados.
 * 
 * @param {} snapshot Snapshot do Firestore.
 * @returns {Array} Um array de documentos formatados
 */
export const mapFirestoreDocs = async (query) => {
    const querySnapshot = await getDocs(query);
    
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}