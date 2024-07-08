import Navbar from "../ui/components/header/Navbar";
import Sidebar from "../ui/components/home/Sidebar";

function Home() {
    return(
        <div className="grid grid-rows-6 grid-cols-2 h-screen">
            <Navbar/>
            <Sidebar/>
        </div>
    );
}

export default Home