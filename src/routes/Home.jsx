import Navbar from "../ui/components/header/Navbar";
import Content from "../ui/components/home/Content";
import Sidebar from "../ui/components/home/Sidebar";

import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        document.title = 'LupaSpace';
    }, []);
    
    return(
        <div className="grid grid-rows-[90px_1fr] grid-cols-[350px_1fr] mx-lg:grid-cols-1 h-[100vh]">
            <Navbar/>
            <Sidebar/>
            <Content/>
        </div>
    );
}