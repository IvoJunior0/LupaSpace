import Navbar from "../ui/components/header/Navbar";
import Sidebar from "../ui/components/home/Sidebar";

function Home() {
    return(
        <div className="grid">
            <Navbar/>
            <Sidebar/>
        </div>
    );
}

export default Home