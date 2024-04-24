import Input from "../ui/components/form/Input";
import { Link } from "react-router-dom";

function Login() {
    return(
        <>
            <div className="bg-gradient-to-r from-white to-green-200 h-screen flex justify-center items-center ">
                <div className="bg-green-600 p-8 rounded-xl w-full max-w-96 shadow-xl mx-4">
                    <h1 className="text-center text-white font-logo font-bold text-5xl pb-8">Login</h1>
                    <form action="" className="text-center">
                        <Input type="email" placeholder="Seu email"/>
                        <Input type="password" placeholder="Sua senha"/>
                        <div className="flex justify-between text-white pb-7">
                            <div>
                                <input type="checkbox" />
                                <label htmlFor="Remeber me">Lembrar login</label>
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