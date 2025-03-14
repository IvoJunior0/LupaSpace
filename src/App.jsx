// Hooks
import { useEffect, useState } from "react";

// React Router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Firebase
import { auth } from "./config/firebase";

// Rotas
import Login from "./routes/Login";
import Register from "./routes/Register";
import HelloWorld from "./routes/HelloWorld";
import User from "./routes/User";
import Following from "./routes/Following";
import Error from "./routes/Error";
import ProjectPage from "./routes/ProjectPage";
import SearchPage from "./routes/SearchPage";
import QueryResultPage from "./routes/QueryResultPage";
import MainLayout from "./ui/components/extras/MainLayout";
import Content from "./ui/components/home/Content";

function App() {
    const [user, setUser] = useState();
    useEffect(() => {
        auth.onAuthStateChanged((user) => { // Fazendo o usuário continuar logado
            setUser(user);
        })
    });
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />} >
                    <Route path="/" element={<Content />} />
                    <Route path="/pesquisa" element={<SearchPage/>}>
                        <Route path="busca" element={<QueryResultPage/>}/> {/* Resultado da pesquisa */}
                    </Route>
                    <Route path="/seguindo" element={<Following />} />
                    <Route path="/user/:uid" element={<User />}>
                        <Route path="projetos/:projectId" element={<ProjectPage />} />
                    </Route>
                </Route>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Register />} />
                {/* Rotas easter eggs */}
                <Route path="/helloworld" element={<HelloWorld />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>
    );
}

export default App