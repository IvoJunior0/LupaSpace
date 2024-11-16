// HomePage do site
import { Outlet } from "react-router-dom";
import Navbar from "./header/Navbar";
import Sidebar from "./home/Sidebar";

import { useEffect } from "react";

/**
 * Layout das páginas principais do site. Não é uma rota.
 */
export default function Layout() {
    useEffect(() => {
        document.title = 'LupaSpace';
    }, []);

    return (
        <div className="grid grid-rows-[90px_1fr] grid-cols-[320px_1fr] mx-lg:grid-cols-1 h-[100vh]">
            <Navbar />
            <Sidebar />
            <div className="px-5 w-full mt-[90px] mb-[24px] py-[24px] h-fit col-end-2 max-[1199px]:col-span-full col-start-2">
                <Outlet />
            </div>
        </div>
    );
}