import { useEffect } from "react";

import Navbar from "../ui/components/header/Navbar";
import Sidebar from "../ui/components/home/Sidebar";
import ForumBlocks from "../ui/components/forum/ForumsBlock";

import { Outlet } from "react-router-dom";

export default function CommunityHub() {
    useEffect(() => {
        document.title = 'Comunidades';
    }, []);

    return(
        <div className="grid grid-rows-[90px_1fr] grid-cols-[320px_1fr] h-screen w-full">
            <Navbar/>
            <Sidebar/>
            <Outlet/>
            <div className="px-5 w-full mt-[90px] mb-[24px] py-[24px] h-fit col-end-2 max-[1199px]:col-span-full col-start-2 flex flex-col gap-7">
                <h1 className="sm:text-4xl text-2xl text-gray-500 font-semibold">Comunidades do LupaSpace</h1>
                <hr className="border-t-2"/>
                <ForumBlocks/>
            </div>
        </div>
    );
}