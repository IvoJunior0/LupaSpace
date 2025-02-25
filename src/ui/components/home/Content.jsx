import { useEffect } from "react";

import FilterButton from "../buttons/FilterButton";
import RecentPosts from "./RecentPosts";
import TitlePage from "../extras/TitlePage";

/**
 * Homepage do LupaSpace.
 * 
 * @returns {JSX.Element} Componente renderizado.
 */
export default function Content() {
    useEffect(() => {
        document.title = 'LupaSpace';
    }, []);
    return(
        <div className="px-5 w-full mt-[90px] mb-[24px] py-[24px] h-fit col-end-2 max-[1199px]:col-span-full col-start-2">
            <TitlePage text="Últimas publicações" />
            <RecentPosts/>
        </div>
    );
}