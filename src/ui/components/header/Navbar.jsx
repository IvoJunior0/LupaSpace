// Componentes
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchButton from "../buttons/SearchButton";
import Menu from "./Menu";

// Firebase
import { auth } from "../../../config/firebase";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus, faRightFromBracket, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import CreatePost from "./CreatePost";

/**
 * Componente da barra de navegação superior.
 */
function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [menu, setMenu] = useState(false); // Icone do menu.
    const [post, setPost] = useState(false); // Abrir ou fechar o menu.
    const [loading, setLoading] = useState(true);
    let menuIcon = <FontAwesomeIcon icon={faBars}/>

    // Função de logout
    async function logOut() {
        try {
            await auth.signOut();
            window.location.href = "/login"; // Redireciona para página de login
        }
        catch (error) {} // TODO: trocar por erro visual
    }

    // Trocar icone do menu da navbar
    if (menu) {
        menuIcon = <FontAwesomeIcon icon={faXmark} className="text-2xl"/>
    } else {
        menuIcon = <FontAwesomeIcon icon={faBars} className="text-2xl"/>
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setLoading(false);
        });
    
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <header className="bg-green-600 p-6 flex justify-between items-center fixed top-0 left-0 w-full h-[90px] z-10">
                <div className="flex items-center justify-center w-full h-full">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white" role="status">
                        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0">
                            carregando...
                        </span>
                    </div>
                </div>
            </header>
        );
    }

    return(
        <header className="bg-green-600 p-6 flex justify-between items-center fixed top-0 left-0 w-full h-[90px] z-10">
            <div className="nav-left flex items-center gap-6">
                <Link to={"/"} className="font-logo text-white text-2xl">LupaSpace</Link>
                <SearchButton/>
            </div>

            {user ? (
                <>
                    <ul className="flex text-white gap-8 items-center">
                        <li className="block max-lg:hidden"><button onClick={() => setPost(true)}><FontAwesomeIcon icon={faPlus} className="text-2xl"/></button></li>
                        <li className="block max-lg:hidden"><button onClick={() => navigate(`/user/${user.uid}`)}><FontAwesomeIcon icon={faUser} className="text-2xl"/></button></li>
                        <li className="text-2xl"><button onClick={() => setMenu(!menu)}>{menuIcon}</button></li>
                    </ul>
                    <Menu active={menu}></Menu>
                    <CreatePost trigger={post} setTrigger={setPost}/>
                </>) : (
                    <>
                        <ul className="flex text-white gap-6 items-center">
                            <li className="block max-lg:hidden"><Link to="/registro">Cadastrar-se</Link></li>
                            <li className="block max-lg:hidden"><Link to="/login"><button className="bg-green-800 py-2.5 px-7 rounded-xl font-semibold transition-all duration-200 hover:bg-green-950">Login</button></Link></li>
                            <li className="text-2xl hidden max-lg:block"><button onClick={() => setMenu(!menu)}><FontAwesomeIcon icon={faBars}/></button></li> 
                        </ul>
                        <Menu active={menu}></Menu>
                    </>
            )}
        </header>
    );
}

export default Navbar