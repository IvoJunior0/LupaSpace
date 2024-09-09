import { useState } from "react"

import { useLocation } from "react-router-dom";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";

export default function CreateTopicPage() {
    // States normais
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [path, setPath] = useState("");

    // Query parameters
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const subforumID = queryParams.get('subforumID');
    const forumID = queryParams.get('forumID');

    const user = auth.currentUser;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (subforumID && forumID) {
            try {
                const topicPath = `Forums/${forumID}/Subforums/${subforumID}/Topics`;
                await addDoc(collection(db, topicPath), {
                    title: title,
                    content: content,
                    authorID: user.uid,
                    createdAt: serverTimestamp(),
                    replyCount: 0,
                    viewCount: 0,
                    status: "ativo",
                    mentions: []
                })
                console.log("deu bom") // Debug
            } catch (error) {
                console.log("Erro: ", error) // Debug
            }
        } else {
            console.log("Erro: Forum ou Subforum não encontrados (query parameters inválidos)") // Debug
        }
        setLoading(false);
    }

    return(
        <>
            <hr className="border-t-2"/>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 text-gray-500">
                <div>
                    <h1 className="text-xl font-bold">Criar novo tópico</h1>
                </div>
                <div className="">
                    <label className="block font-semibold">Título</label>
                    <input type="text" placeholder="Título do tópico" onChange={(e) => setTitle(e.target.value)} className="block w-full p-2.5 bg-slate-100 border-slate-300 border-2 rounded-md focus:outline-none focus:border-slate-400" required/>
                </div>
                <div className="">
                    <label className="block font-semibold">Conteúdo</label>
                    <textarea name="" id="" placeholder="Conteúdo do tópico" onChange={(e) => setContent(e.target.value)} className="block resize-none w-full min-h-44 p-2.5 bg-slate-100 border-slate-300 border-2 rounded-md focus:outline-none focus:border-slate-400" required/>
                </div>
                <div className="self-end">
                    <button type="submit" className="text-white py-2 px-4 rounded bg-green-600 hover:bg-green-500">Publicar</button>
                </div>
            </form>
        </>
    )
}