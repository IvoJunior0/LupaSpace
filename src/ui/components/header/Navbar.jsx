function Navbar() {
    return(
        <header className="bg-green-600 p-6 flex justify-between items-center">
            <div className="nav-left flex items-center gap-6">
                <a href="#" className="font-logo text-white text-2xl">LupaSpace</a>
                <input type="text" placeholder="Buscar por..." className="border-none rounded-xl py-2.5 px-9 outline-none text-neutral-400"/>
            </div>
            <ul className="flex text-white gap-6 items-center">
                <li><a href="#">Cadastrar-se</a></li>
                <li><button className="bg-green-800 py-2.5 px-7 rounded-xl font-semibold transition-all duration-200 hover:bg-green-950">Login</button></li>
            </ul>
        </header>
    );
}

export default Navbar