// Componentes
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchButton from "../buttons/SearchButton";
import Menu from "./Menu";

// Firebase
import { auth, db } from "../../../config/firebase";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPlus, faRightFromBracket, faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import CreatePost from "./CreatePost";

function Navbar() {
    const navigate = useNavigate();
    const user = auth.currentUser;
    const [menu, setMenu] = useState(false);
    const [post, setPost] = useState(false);
    let menuIcon = <FontAwesomeIcon icon={faBars}/>

    async function logOut() {
        try {
            await auth.signOut();
            window.location.href = "/login";
        }
        catch (error) {}
    }

    if (menu) {
        menuIcon = <FontAwesomeIcon icon={faXmark} className="text-2xl"/>
    } else {
        menuIcon = <FontAwesomeIcon icon={faBars} className="text-2xl"/>
    }

    if (user) {
        return(
            <header className="bg-green-600 p-6 flex justify-between items-center fixed top-0 left-0 w-full h-[90px] z-10">
                <div className="nav-left flex items-center gap-6">
                    <a href="#" className="font-logo text-white text-2xl">LupaSpace</a>
                    <input type="text" placeholder="Buscar por..." className="border-none rounded-xl py-2.5 px-9 outline-none text-neutral-400 max-w-56 max-md:hidden"/>
                    <SearchButton/>
                </div>
                <ul className="flex text-white gap-8 items-center">
                    <li className="block max-lg:hidden"><button onClick={() => setPost(true)}><FontAwesomeIcon icon={faPlus} className="text-2xl"/></button></li>
                    <li className="block max-lg:hidden"><button onClick={() => navigate(`/user/${user.uid}`)}><FontAwesomeIcon icon={faUser} className="text-2xl"/></button></li>
                    <li className="text-2xl"><button onClick={() => setMenu(!menu)}>{menuIcon}</button></li>
                </ul>
                <Menu active={menu}></Menu>
                <CreatePost trigger={post} setTrigger={setPost}/>
            </header>
        );
    }

    return(
        <header className="bg-green-600 p-6 flex justify-between items-center col-span-full row-start-1 row-end-2 fixed top-0 left-0 w-full h-[90px] z-10">
            <div className="nav-left flex items-center gap-6">
                <a href="#" className="font-logo text-white text-2xl">LupaSpace</a>
                <input type="text" placeholder="Buscar por..." className="border-none rounded-xl py-2.5 px-9 outline-none text-neutral-400 max-w-56 max-md:hidden"/>
                <SearchButton/>
            </div>
            <ul className="flex text-white gap-6 items-center">
                <li className="block max-lg:hidden"><Link to="/registro">Cadastrar-se</Link></li>
                <li className="block max-lg:hidden"><Link to="/login"><button className="bg-green-800 py-2.5 px-7 rounded-xl font-semibold transition-all duration-200 hover:bg-green-950">Login</button></Link></li>
                <li className="text-2xl hidden max-lg:block"><button onClick={() => setMenu(!menu)}><FontAwesomeIcon icon={faBars}/></button></li> 
            </ul>
            <Menu active={menu}></Menu>
        </header>
    );
}

export default Navbar