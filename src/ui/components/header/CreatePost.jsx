import { useEffect, useState } from "react";

import { auth, db } from "../../../config/firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { storage } from "../../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { v4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import TagSelector from "../Posts/TagSelector";

export default function CreatePost(props) {
    const [title, setTitle] = useState("");
    const [descricao, setDescricao] = useState("");
    const [mensagem, setMensagem] = useState(""); // Mensagem de erro
    const [tagMenu, setTagMenu] = useState(false);
    const [tags, setTags] = useState([]);
    const [fileUpload, setFileUpload] = useState(null);
    const [loading, setLoading] = useState(false);
    const user = auth.currentUser;

    const handleSubmit = async (e) => {
        if (tags)
        e.preventDefault();
        if (title.trim() && descricao.trim()) {
            setLoading(true);
            try {
                const postID = v4();
                let fileURL = null;
                if (fileUpload) {
                    const fileRef = ref(storage, `arquivos/projects/${postID}/${fileUpload.name}`);
                    const uploadTask = await uploadBytes(fileRef, fileUpload);
                    fileURL = await getDownloadURL(uploadTask.ref);
                }
                await setDoc(doc(db, "Projects", postID), {
                    titulo: title,
                    descricao: descricao,
                    authorID: user ? user.uid : null,
                    tags: tags,
                    likes: 0,
                    dislikes: 0,
                    createdAt: serverTimestamp(),
                    fileURL: fileURL,
                    favoritedBy: [],
                    collaborators: [],
                    thumbnailURL: null,
                    pinned: false,
                    isPublic: true,
                    comments: [],
                    liked: false,
                    favorited: false,
                    disliked: false,
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
        }
    }

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setTags(t => [...t, value]);
        } else {
            setTags(t => t.filter((item) => item !== value));
        }
    };

    return(
        <div className={`top-0 left-0 flex justify-center backdrop-brightness-50 backdrop-blur-[1.5px] w-full h-full ${(props.trigger) ? 'fixed' : 'hidden'}`}>
            <form className="flex flex-col gap-5 w-[100%] h-[480px] p-8 max-w-3xl mx-4 bg-slate-50 text-gray-500 self-center rounded-xl border-4 border-gray-300 shadow-lg h-fit" onSubmit={handleSubmit}>
                <div className="flex justify-between">
                    <h1 className="sm:text-4xl text-3xl font-semibold">Criar Projeto</h1>
                    <button type="button" onClick={() => props.setTrigger(false)}>
                        <FontAwesomeIcon icon={faXmark} className="text-2xl"/>
                    </button>
                </div>
                <div>
                    <label className="block text-lg">Título</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Insira o título aqui" className="block w-full p-2.5 bg-slate-100 border-slate-300 border-2 rounded-md focus:outline-none focus:border-slate-400" id="titulo" required={props.trigger} name="titulo"/>
                </div>
                <div>
                    <label className="block text-lg">Descrição</label>
                    <textarea className="block resize-none w-full p-2.5 bg-slate-100 border-slate-300 border-2 rounded-md focus:outline-none focus:border-slate-400" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descreva sua postagem aqui" required={props.trigger}></textarea>
                </div>
                <div>
                    <div className="space-y-8 max-w-md mx-auto my-5">
                        <input type="file" className="w-full text-gray-500 font-medium text-sm bg-slate-100 border-slate-300 border-2 rounded-md file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" onChange={(event) => {
                                setFileUpload(event.target.files[0]);
                            }}/>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div className="relative inline-block">
                        <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={() => setTagMenu(!tagMenu)}>Selecione as tags</button>
                        <ul className={`${!tagMenu ? "hidden": "absolute"} bottom-11 z-10 bg-gray-400 min-w-72 text-white px-4 py-2 rounded shadow-md`}>
                            <li className="flex items-center gap-3">
                                <input type="checkbox" onChange={handleCheckboxChange} id={"db"} className="accent-green-600 p-2 w-4 h-4 rounded outline-none border-0" value={"Banco de Dados"}></input>
                                <label htmlFor={"db"} className="w-full text-[15px]">Banco de Dados</label>
                            </li>
                            <li className="flex items-center gap-3">
                                <input type="checkbox" onChange={handleCheckboxChange} id={"web"} className="accent-green-600 p-2 w-4 h-4 rounded outline-none border-0" value={"Desenvolvimento Web"}></input>
                                <label htmlFor={"web"} className="w-full text-[15px]">Desenvolvimento Web</label>
                            </li>
                            <li className="flex items-center gap-3">
                                <input type="checkbox" onChange={handleCheckboxChange} id={"lp"} className="accent-green-600 p-2 w-4 h-4 rounded outline-none border-0" value={"Lógica de Programação"}></input>
                                <label htmlFor={"lp"} className="w-full text-[15px]">Lógica de Programação</label>
                            </li>
                        </ul>
                    </div>
                    <button type="submit" disabled={loading} className="bg-green-600 text-slate-50 py-3 px-8 rounded hover:bg-green-500 disabled:bg-green-900">{loading ? <p>Carregando...</p> : <p>Postar</p>}</button>
                </div>
            </form>
        </div>
    );
}