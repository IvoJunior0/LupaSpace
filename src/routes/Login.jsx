import Input from "../ui/components/form/Input";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";

function Login() {
    return(
        <>
            <div className="bg-gradient-to-r from-white to-green-200 h-screen flex justify-center items-center ">
                <div className="bg-green-600 p-8 rounded-xl w-full max-w-96 shadow-xl mx-4">
                    <h1 className="text-center text-white font-logo font-bold text-5xl pb-8"><FontAwesomeIcon icon={faCircleUser} /> Login</h1>
                    <form action="" className="text-center">
                        <Input type="email" placeholder="Seu email">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </Input>
                        <Input type="password" placeholder="Sua senha">
                            <FontAwesomeIcon icon={faLock} />
                        </Input>
                        <div className="flex justify-between text-white pb-7">
                            <div className="flex gap-2">
                                <input type="checkbox" />
                                <label htmlFor="Remeber me">Lembrar-me</label>
                            </div>
                            <span>Esqueçeu sua senha?</span>
                        </div>
                        <button type="submit"className="bg-green-800 py-5 px-14 rounded-xl font-semibold text-white transition-all duration-200 hover:bg-green-950">Login</button>
                    </form>
                    <div className="pt-7 text-center text-white">
                        <span>Novo aqui? <Link to="/registro" className="font-semibold">Criar uma conta</Link></span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login