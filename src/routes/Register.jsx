// Outros
import { useState } from "react";

// Firebase
import { auth } from "../config/firebase.jsx";
import { createUserWithEmailAndPassword } from "firebase/auth";

// Componentes
import Input from "../ui/components/form/Input";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faLock, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";

function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            // Debug
            const user = auth.currentUser;
            console.log(user);
            console.log("Usuário registrado!");
        } catch (error) {
            console.log(error.message);
            console.log(`Email: ${email}`);
        }
    }

    return(
        <div className="bg-gradient-to-r from-white to-green-200 h-screen flex justify-center items-center">
            <div className="bg-green-600 p-8 rounded-xl w-full max-w-96 shadow-xl mx-4 text-center">
                <form onSubmit={handleRegister}>
                    <h1 className="text-center text-white font-logo font-bold text-5xl pb-8"><FontAwesomeIcon icon={faRightToBracket}/> Registro</h1>
                    {/* Nome do perfil */}
                    <div className="pb-7 relative">
                        <input type="text" placeholder={"Nome do perfil (nome real)"} className="pl-12 py-3 px-5 rounded-xl w-full outline-none text-neutral-400" onChange={(e) => setName(e.target.value)}/>
                        <div className="absolute top-3 left-5 text-neutral-400">
                            <FontAwesomeIcon icon={faGlobe}/>
                        </div>
                    </div>
                    {/* Nome de usuário */}
                    <div className="pb-7 relative">
                        <input type="text" placeholder={"Nome de usuário"} className="pl-12 py-3 px-5 rounded-xl w-full outline-none text-neutral-400" onChange={(e) => setUsername(e.target.value)}/>
                        <div className="absolute top-3 left-5 text-neutral-400">
                            <FontAwesomeIcon icon={faUser}/>
                        </div>
                    </div>
                    {/* Email */}
                    <div className="pb-7 relative">
                        <input type="email" placeholder={"Seu email"} className="pl-12 py-3 px-5 rounded-xl w-full outline-none text-neutral-400" onChange={(e) => setEmail(e.target.value)}/>
                        <div className="absolute top-3 left-5 text-neutral-400">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                    </div>
                    {/* Senha */}
                    <div className="pb-7 relative">
                        <input type="password" placeholder={"Sua senha"} className="pl-12 py-3 px-5 rounded-xl w-full outline-none text-neutral-400" onChange={(e) => setPassword(e.target.value)}/>
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

export default Register