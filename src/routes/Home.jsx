// TODO: se os layout forem usados, deletar isso depois
// HomePage do site
import Navbar from "../ui/components/header/Navbar";
import Content from "../ui/components/home/Content";
import Sidebar from "../ui/components/home/Sidebar";

import { Outlet } from "react-router-dom";

import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        document.title = 'LupaSpace';
    }, []);
    
    return(
        <Content/>
    );
}