// Hooks
import { useEffect, useState } from "react";

// React Router
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Firebase
import { auth } from "./config/firebase";

// Rotas
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import HelloWorld from "./routes/HelloWorld";
import User from "./routes/User";
import Following from "./routes/Following";
import Error from "./routes/Error";
import ProjectPage from "./routes/ProjectPage";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => { // Fazendo o usuário continuar logado
      setUser(user);
    })
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/seguindo" element={<Following/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registro" element={<Register/>}/>
        <Route path="/user/:uid" element={<User/>}>
            <Route path="projetos/:projectId" element={<ProjectPage/>} />
        </Route>
        <Route path="/helloworld" element={<HelloWorld/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App