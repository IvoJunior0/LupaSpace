import { useEffect } from "react";

import Navbar from "../ui/components/header/Navbar";
import Sidebar from "../ui/components/home/Sidebar";

export default function Following() {
    useEffect(() => {
        document.title = 'Seguindo'; // Quick solution
    }, []);
    return(
        <div className="grid grid-rows-[90px_1fr] grid-cols-[350px_1fr] h-screen w-full">
            <Navbar/>
            <Sidebar/>
        </div>
    );
}