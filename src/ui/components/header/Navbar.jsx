// Componentes
import { Link, useNavigate } from "react-router-dom";
import SearchButton from "../buttons/SearchButton";
import Menu from "./Menu";

// Firebase
import { auth, db } from "../../../config/firebase";

// FontAwesome
import { faBars, faPlus, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection } from "firebase/firestore";

function Navbar() {
    const navigate = useNavigate();
    const user = auth.currentUser;

    const goToMyProfile = () => {
        navigate(`/user/${user.uid}`);
    }

    async function logOut() {
        try {
            await auth.signOut();
            window.location.href = "/login";
        }
        catch (error) {}
    }

    if (user) {
        console.log(user); // Debug
        return(
            <header className="bg-green-600 p-6 flex justify-between items-center col-span-full row-start-1 row-end-2">
                <div className="nav-left flex items-center gap-6">
                    <a href="#" className="font-logo text-white text-2xl">LupaSpace</a>
                    <input type="text" placeholder="Buscar por..." className="border-none rounded-xl py-2.5 px-9 outline-none text-neutral-400 max-w-56 max-md:hidden"/>
                    <SearchButton/>
                </div>
                <ul className="flex text-white gap-8 items-center">
                    <li className="block max-lg:hidden"><FontAwesomeIcon icon={faPlus} className="text-2xl"/></li>
                    <li className="block max-lg:hidden"><button onClick={goToMyProfile}><FontAwesomeIcon icon={faUser} className="text-2xl"/></button></li>
                    <li className="block max-lg:hidden"><button onClick={logOut}><FontAwesomeIcon icon={faRightFromBracket} className="text-2xl"/></button></li>
                    <li className="text-2xl hidden max-lg:block"><button><FontAwesomeIcon icon={faBars}/></button></li>
                </ul>
            </header>
        );
    }

    return(
        <header className="bg-green-600 p-6 flex justify-between items-center col-span-full row-start-1 row-end-2">
            <div className="nav-left flex items-center gap-6">
                <a href="#" className="font-logo text-white text-2xl">LupaSpace</a>
                <input type="text" placeholder="Buscar por..." className="border-none rounded-xl py-2.5 px-9 outline-none text-neutral-400 max-w-56 block max-md:hidden"/>
                <SearchButton/>
            </div>
            <ul className="flex text-white gap-6 items-center">
                <li className="block max-lg:hidden"><Link to="/registro">Cadastrar-se</Link></li>
                <li className="block max-lg:hidden"><Link to="/login"><button className="bg-green-800 py-2.5 px-7 rounded-xl font-semibold transition-all duration-200 hover:bg-green-950">Login</button></Link></li>
                <li className="text-2xl hidden max-lg:block"><FontAwesomeIcon icon={faBars}/></li>
            </ul>
            <Menu></Menu>
        </header>
    );
}

export default Navbar