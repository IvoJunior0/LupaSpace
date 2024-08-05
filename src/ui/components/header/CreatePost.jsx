import { useEffect, useState } from "react";

import { auth, db } from "../../../config/firebase";
import { setDoc, doc } from "firebase/firestore";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function CreatePost(props) {
    const [title, setTitle] = useState("");
    const [descricao, setDescricao] = useState("");
    const [mensagem, setMensagem] = useState(""); // Mensagem de erro
    const [loading, setLoading] = useState(false);
    const user = auth.currentUser;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title.trim() && descricao.trim()) {
            setLoading(true);
            try {
                await setDoc(doc(db, "Posts", user.uid), {
                    titulo: title,
                    descricao: descricao,
                    userId: user ? user.uid : null,
                    timestamp: new Date().toUTCString()
                })
                setTitle('');
                setDescricao('');
                setMensagem('');
                // setMensagem('Post criado com sucesso!');
                console.log("deu certo mano");
            } catch (error) {
                // setMensagem('Erro ao criar o post. Tente novamente.');
                console.log("deu erro mano");
                console.log(error);
                
            } finally {
                setLoading(false);
                props.setTrigger(false);
            }
        } else {
            // setMensagem("Todos os campos precisão ser preenchidos!");
            console.log("burro esqueceu de botar os bgl");
        }
    }

    return(
        <div className={`top-0 left-0 flex justify-center backdrop-brightness-50 backdrop-blur-[1.5px] w-full h-full ${(props.trigger) ? 'fixed' : 'hidden'}`}>
            <form className="flex flex-col gap-5 w-[100%] h-[480px] p-8 max-w-3xl mx-4 bg-slate-50 text-gray-500 self-center rounded-xl border-4 border-gray-300 shadow-lg" onSubmit={handleSubmit}>
                <div className="flex justify-between">
                    <h1 className="sm:text-4xl text-3xl font-semibold">Criar Postagem</h1>
                    <button onClick={() => props.setTrigger(false)}><FontAwesomeIcon icon={faXmark} className="text-2xl"/></button>
                </div>
                <div>
                    <label className="block text-xl">Título</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Insira o título aqui" className="block w-full p-2.5 bg-slate-100 border-slate-300 border-2 rounded-md focus:outline-none focus:border-slate-400" id="titulo" required/>
                </div>
                <div>
                    <label className="block">Descrição</label>
                    <textarea className="block resize-none block w-full p-2.5 bg-slate-100 border-slate-300 border-2 rounded-md focus:outline-none focus:border-slate-400" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descreva sua postagem aqui" required></textarea>
                </div>
                <div>
                    <div className="space-y-8 max-w-md mx-auto my-5">
                        <input type="file"
                            className="w-full text-gray-500 font-medium text-sm bg-slate-100 border-slate-300 border-2 rounded-md file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" />
                    </div>
                </div>
                <div className="flex justify-end items-center">
                    <button type="submit" disabled={loading} className="bg-green-600 text-slate-50 py-3 px-8 rounded hover:bg-green-500 disabled:bg-green-900">{loading ? <p>Carregando...</p> : <p>Postar</p>}</button>
                </div>
            </form>
        </div>
    );
}