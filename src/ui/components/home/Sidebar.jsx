import SidebarButton from "../buttons/SidebarButtons";

export default function Sidebar(){
    return(
        <div className="border-r-4 h-screen w-80 bg-slate-50 col-span-1 fixed z-0 pt-24 px-8">
            <SidebarButton text="Página Inicial"/>
            <SidebarButton text="Seguindo"/>
            <hr className="h-1"/>
            <SidebarButton text="Acessibilidade"/>
        </div>
    );
}