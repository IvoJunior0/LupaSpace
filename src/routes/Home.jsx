import Navbar from "../ui/components/header/Navbar";
import Sidebar from "../ui/components/home/Sidebar";

export default function Home() {
    return(
        <div className="grid grid-rows-[112px_1fr] grid-cols-[384px_1fr] h-screen w-full">
            <Navbar/>
            <Sidebar/>
        </div>
    );
}