import Navbar from "../header/Navbar";
import Sidebar from "../home/Sidebar";

import { Outlet } from "react-router-dom";

/**
 * Layout com a navbar e a sidebar para o site inteiro.
 * Não é usado somente nas telas de registro e login.
 * 
 * @returns {JSX.Element} Componente layout principal
 */
export default function MainLayout() {
    return(
        <div className="grid grid-rows-[90px_1fr] grid-cols-[320px_1fr] mx-lg:grid-cols-1 h-[100vh]">
            <Navbar/>
            <Sidebar/>
            <Outlet/>
        </div>
    );
}