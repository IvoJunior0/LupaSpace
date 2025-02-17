import { useEffect } from "react";

import Navbar from "../ui/components/header/Navbar";
import Sidebar from "../ui/components/home/Sidebar";

export default function Following() {
    useEffect(() => {
        document.title = 'Seguindo'; // Algum dia eu mudo isso pra algo melhor
    }, []);
    // TODO: fazer a lógica de mostrar os seguidos do usuário.
    return(
        <></>
    );
}