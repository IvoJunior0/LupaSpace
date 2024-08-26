import { useEffect } from "react";

import Navbar from "../ui/components/header/Navbar";
import Sidebar from "../ui/components/home/Sidebar";
import ForumBlocks from "../ui/components/forum/ForumsBlock";

export default function CommunityHub() {
    useEffect(() => {
        document.title = 'Comunidades';
    }, []);

    const forums = [
        { id: 'programming', name: 'Programação', path: '/forum/programming' },
        { id: 'db', name: 'Banco de Dados', path: '/forum/databases' },
        { id: 'networks', name: 'Redes e Hardware', path: '/forum/networks' },
      ];

    return(
        <div className="grid grid-rows-[90px_1fr] grid-cols-[350px_1fr] h-screen w-full">
            <Navbar/>
            <Sidebar/>
            <div className="px-5 w-full mt-[90px] mb-[24px] py-[24px] h-fit col-end-2 max-[1199px]:col-span-full col-start-2 flex flex-col gap-7">
                <h1 className="sm:text-3xl text-2xl text-gray-500 font-semibold">Comunidades do LupaSpace</h1>
                <hr />
                <ForumBlocks/>
            </div>
        </div>
    );
}