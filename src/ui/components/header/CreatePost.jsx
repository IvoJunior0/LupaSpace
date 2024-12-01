import { useEffect, useState } from "react";

import { auth, db } from "../../../config/firebase";
import { setDoc, doc, serverTimestamp, collection, getCountFromServer } from "firebase/firestore";
import { storage } from "../../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { v4 } from "uuid";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import TagSelector from "../Posts/TagSelector";

/**
 * Componente do formulário de criação de publicações.
 * 
 * @param {Object} props - O componente aceita dois parâmetros pela props.
 * @param {boolean} trigger - Estado atual do menu (aberto ou fechado).
 * @param {Function} setTrigger - Mudar o atual estado do menu (fechar ou abrir).
 * 
 * @returns {JSX.Element} - Componente renderizado.
 */
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
                const projectRef = doc(db, "Projects", postID); // Documento dos projeto na coleçao "Projects".

                const userRef = doc(db, "Users", user.uid); // Documento do usuário.        
                const projectsInUserRef = collection(db, userRef.path, "Projects"); // Subcoleção "Projects" no documento do usuário.

                // Só será adicionada a URL do arquivo no objeto do projeto se ele for selecionado no formulário. 
                if (fileUpload) {
                    const fileRef = ref(storage, `arquivos/projects/${postID}/${fileUpload.name}`);
                    const uploadTask = await uploadBytes(fileRef, fileUpload);
                    fileURL = await getDownloadURL(uploadTask.ref);
                }

                const countSnapshot = await getCountFromServer(collection(db, "Projects"));
                console.log(countSnapshot.data().count);

                const projectData = {
                    // projectId: countSnapshot + 1
                    titulo: title,
                    descricao: descricao,
                    authorID: user ? user.uid : "",
                    tags: tags,
                    likes: 0,
                    dislikes: 0,
                    createdAt: serverTimestamp(),
                    fileURL: fileURL,
                    // TODO: Procurar os favoritos em um documento de uma coleção "Favoritos" no documento do usuário
                    collaborators: [],
                    thumbnailURL: "",
                    pinned: false,
                    isPublic: true,
                    // comments: [] TODO: transformar em coleção
                }

                // Adicionando na coleção própria dos projetos "Projects".
                await setDoc(projectRef, projectData);

                // Adicionando na subcoleção "Projects" do usuário.
                await setDoc(doc(projectsInUserRef, postID), projectData);

                // Resetando os inputs do formulário.
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

    /**
     * 
     * @param {*} event 
     */
    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setTags(t => [...t, value]);
        } else {
            setTags(t => t.filter((item) => item !== value));
        }
    };

    // TODO: componentização das checkbox
    return (
        <div className={`top-0 left-0 flex justify-center backdrop-brightness-50 backdrop-blur-[1.5px] w-full h-full ${(props.trigger) ? 'fixed' : 'hidden'}`}>
            <form className="flex flex-col gap-5 w-[100%] h-[480px] p-8 max-w-3xl mx-4 bg-slate-50 text-gray-500 self-center rounded-xl border-4 border-gray-300 shadow-lg h-fit" onSubmit={handleSubmit}>
                <div className="flex justify-between">
                    <h1 className="sm:text-4xl text-3xl font-semibold">Criar Projeto</h1>
                    <button type="button" onClick={() => props.setTrigger(false)}>
                        <FontAwesomeIcon icon={faXmark} className="text-2xl" />
                    </button>
                </div>
                <div>
                    <label className="block text-lg">Título</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Insira o título aqui" className="block w-full p-2.5 bg-slate-100 border-slate-300 border-2 rounded-md focus:outline-none focus:border-slate-400" id="titulo" required={props.trigger} name="titulo" />
                </div>
                <div>
                    <label className="block text-lg">Descrição</label>
                    <textarea className="block resize-none w-full p-2.5 bg-slate-100 border-slate-300 border-2 rounded-md focus:outline-none focus:border-slate-400" id="descricao" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Descreva sua postagem aqui" required={props.trigger}></textarea>
                </div>
                <div>
                    <div className="space-y-8 max-w-md mx-auto my-5">
                        <input type="file" className="w-full text-gray-500 font-medium text-sm bg-slate-100 border-slate-300 border-2 rounded-md file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-gray-800 file:hover:bg-gray-700 file:text-white rounded" onChange={(event) => {
                            setFileUpload(event.target.files[0]);
                        }} />
                    </div>
                </div>
                {/* Selecionar tags */}
                {/* TODO: fazer as tags serem obrigatórias na hora de enviar o formulário */}
                <div className="flex justify-between items-center">
                    <div className="relative inline-block">
                        <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={() => setTagMenu(!tagMenu)}>Selecione as tags</button>
                        {/* Lista de tags */}
                        <ul className={`${!tagMenu ? "hidden" : "absolute"} bottom-11 z-10 bg-gray-400 min-w-72 text-white px-4 py-2 rounded shadow-md`}>
                            {/* Lógica de programação */}
                            <li className="flex items-center gap-3">
                                <input type="checkbox" onChange={handleCheckboxChange} id={"lp"} className="accent-green-600 p-2 w-4 h-4 rounded outline-none border-0" value={"Lógica de Programação"}></input>
                                <label htmlFor={"lp"} className="w-full text-[15px]">Lógica de Programação</label>
                            </li>
                            {/* POO */}
                            <li className="flex items-center gap-3">
                                <input type="checkbox" onChange={handleCheckboxChange} id={"poo"} className="accent-green-600 p-2 w-4 h-4 rounded outline-none border-0" value={"Programação Orientada a Objetos"}></input>
                                <label htmlFor={"lp"} className="w-full text-[15px]">Programação Orientada a Objetos</label>
                            </li>
                            {/* Desenvolvimento web */}
                            <li className="flex items-center gap-3">
                                <input type="checkbox" onChange={handleCheckboxChange} id={"web"} className="accent-green-600 p-2 w-4 h-4 rounded outline-none border-0" value={"Desenvolvimento Web"}></input>
                                <label htmlFor={"web"} className="w-full text-[15px]">Desenvolvimento Web</label>
                            </li>
                            {/* Banco de dados */}
                            <li className="flex items-center gap-3">
                                <input type="checkbox" onChange={handleCheckboxChange} id={"db"} className="accent-green-600 p-2 w-4 h-4 rounded outline-none border-0" value={"Banco de Dados"}></input>
                                <label htmlFor={"db"} className="w-full text-[15px]">Banco de Dados</label>
                            </li>
                            {/* Redes de computadores */}
                            <li className="flex items-center gap-3">
                                <input type="checkbox" onChange={handleCheckboxChange} id={"redes"} className="accent-green-600 p-2 w-4 h-4 rounded outline-none border-0" value={"Redes de Computadores"}></input>
                                <label htmlFor={"lp"} className="w-full text-[15px]">Redes de Computadores</label>
                            </li>
                            {/* Hardware */}
                            <li className="flex items-center gap-3">
                                <input type="checkbox" onChange={handleCheckboxChange} id={"hardware"} className="accent-green-600 p-2 w-4 h-4 rounded outline-none border-0" value={"Hardware"}></input>
                                <label htmlFor={"lp"} className="w-full text-[15px]">Hardware</label>
                            </li>
                            {/* Informática básica */}
                            <li className="flex items-center gap-3">
                                <input type="checkbox" onChange={handleCheckboxChange} id={"info"} className="accent-green-600 p-2 w-4 h-4 rounded outline-none border-0" value={"Informática Básica"}></input>
                                <label htmlFor={"lp"} className="w-full text-[15px]">Informática Básica</label>
                            </li>
                            {/* Artigos */}
                            <li className="flex items-center gap-3">
                                <input type="checkbox" onChange={handleCheckboxChange} id={"tcc"} className="accent-green-600 p-2 w-4 h-4 rounded outline-none border-0" value={"Artigos"}></input>
                                <label htmlFor={"lp"} className="w-full text-[15px]">Artigos</label>
                            </li>
                        </ul>
                    </div>
                    <button type="submit" disabled={loading} className="bg-green-600 text-slate-50 py-3 px-8 rounded hover:bg-green-500 disabled:bg-green-900">{loading ? <p>Carregando...</p> : <p>Postar</p>}</button>
                </div>
            </form>
        </div>
    );
}