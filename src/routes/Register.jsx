// Outros
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../config/firebase.jsx";
import { setDoc, doc, serverTimestamp, collection } from "firebase/firestore";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faLock, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";

export default function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [turma, setTurma] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Registro';
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            if (user) {
                const userRef = doc(db, "Users", user.uid); // Documento do usuário.        
                
                await setDoc(userRef, {
                    email: user.email,
                    name: name,
                    username: username,
                    bio: "",
                    pfp: null,
                    createdAt: serverTimestamp(),
                    lvl: 1,
                    xp: 0,
                    badge: [], // TODO: fazer uma coleção com todas as badges e depois colocar o id dos documentos nesse array
                    achviments: [], // Talvez trocar por uma coleção ao invés de um atributo no futuro.
                    projects: [], // TODO: trocar por uma subcoleção com id dos documentos dos projetos
                    favoritedProjects: [], // TODO: mesma coisa do de cima
                    following: [],
                    followers: [],
                    /**
                     * Sites e redes sociais compatíveis:
                     * - Github
                     * - Linkedin
                     * - Instagram
                     * - Email acadêmico
                     * 
                     * Os index no array são organizados na ordem que está na lista.
                     * Contacs[0] vai ser o link do github, contacts[1] o do linkedin e assim sucessivamente.
                     */
                    contacs: [],
                    // Info. 1, Info. 2 ou Info. 3
                    turma: turma
                });
            }
            navigate("/");
        } catch (error) {
            console.log("Erro no cadastro:", error);
        }
    }

    return(
        <div className="bg-gradient-to-r from-white to-green-200 h-screen flex justify-center items-center">
            <div className="bg-green-600 p-8 rounded-xl w-full max-w-96 shadow-xl mx-4 text-center">
                <form onSubmit={handleRegister}>
                    <h1 className="text-center text-white font-logo font-bold text-5xl pb-8"><FontAwesomeIcon icon={faRightToBracket}/> Registro</h1>
                    {/* Nome do perfil */}
                    <div className="pb-7 relative">
                        <input type="text" placeholder={"Nome do perfil (nome real)"} className="pl-12 py-3 px-5 rounded-xl w-full outline-none text-neutral-400" onChange={(e) => setName(e.target.value)} required/>
                        <div className="absolute top-3 left-5 text-neutral-400">
                            <FontAwesomeIcon icon={faGlobe}/>
                        </div>
                    </div>
                    {/* Nome de usuário */}
                    <div className="pb-7 relative">
                        <input type="text" placeholder={"Nome de usuário"} className="pl-12 py-3 px-5 rounded-xl w-full outline-none text-neutral-400" onChange={(e) => setUsername(e.target.value)} required/>
                        <div className="absolute top-3 left-5 text-neutral-400">
                            <FontAwesomeIcon icon={faUser}/>
                        </div>
                    </div>
                    {/* Email */}
                    <div className="pb-7 relative">
                        <input type="email" placeholder={"Seu email"} className="pl-12 py-3 px-5 rounded-xl w-full outline-none text-neutral-400" onChange={(e) => setEmail(e.target.value)} required/>
                        <div className="absolute top-3 left-5 text-neutral-400">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                    </div>
                    {/* Senha */}
                    <div className="pb-7 relative">
                        <input type="password" placeholder={"Sua senha"} className="pl-12 py-3 px-5 rounded-xl w-full outline-none text-neutral-400" onChange={(e) => setPassword(e.target.value)} required/>
                        <div className="absolute top-3 left-5 text-neutral-400">
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                    </div>
                    <button type="submit" className="bg-green-800 py-5 px-14 rounded-xl font-semibold text-white transition-all duration-200 hover:bg-green-950">Criar conta</button>
                </form>
            </div>
        </div>
    );
}