// Importações de componentes
import Input from "../ui/components/form/Input";
import { Link } from "react-router-dom";

// Importações do Firebase
import { auth, googleProvider } from "../config/firebase.jsx";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

// Importações de Icones
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signIn = async (e) => {
        e.preventDefault();
        try {
            signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    }

    return(
        <div className="bg-gradient-to-r from-white to-green-200 h-screen flex justify-center items-center">
            <div className="bg-green-600 p-8 rounded-xl w-full max-w-96 shadow-xl mx-4">
                <h1 className="text-center text-white font-logo font-bold text-5xl pb-8"><FontAwesomeIcon icon={faCircleUser} /> Login</h1>
                <form onSubmit={signIn} className="text-center">
                    <div className="pb-7 relative">
                        <input type="email" placeholder={"Seu email"} className="pl-12 py-3 px-5 rounded-xl w-full outline-none text-neutral-400" onChange={(e) => setEmail(e.target.value)} required/>
                        <div className="absolute top-3 left-5 text-neutral-400">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                    </div>
                    <div className="pb-7 relative">
                        <input type="password" placeholder={"Sua senha"} className="pl-12 py-3 px-5 rounded-xl w-full outline-none text-neutral-400" onChange={(e) => setPassword(e.target.value)} required/>
                        <div className="absolute top-3 left-5 text-neutral-400">
                            <FontAwesomeIcon icon={faLock} />
                        </div>
                    </div>
                    <div className="flex justify-between text-white pb-7">
                        <div className="flex gap-2">
                            <input type="checkbox" name="lembrar" id="lembrar"/>
                            <label htmlFor="lembrar">Lembrar-me</label>
                        </div>
                        <span>Esqueçeu sua senha?</span>
                    </div>
                    <button type="submit" onClick={signIn} className="bg-green-800 py-5 px-14 rounded-xl font-semibold text-white transition-all duration-200 hover:bg-green-950">Login</button>
                </form>
                <div className="pt-7 text-center text-white">
                    <span>Novo aqui? <Link to="/registro" className="font-semibold">Criar uma conta</Link></span>
                </div>
                <div className="flex justify-between items-center pt-7">
                    <hr className="bg-white h-px w-5/12"/>
                    <h2 className="text-white">Ou</h2>
                    <hr className="bg-white h-px w-5/12"/>
                </div>
                <div className="flex justify-between items-center pt-7 py">
                    <button onClick={signInWithGoogle} type="submit"><FontAwesomeIcon icon={faGoogle} /></button>
                    <FontAwesomeIcon icon={faGithub} />
                </div>
            </div>
        </div>
    );
}