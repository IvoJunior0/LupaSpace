import { useEffect, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

// Rotas
import Home from "./routes/Home";
import Community from "./routes/Community";
import Login from "./routes/Login";
import Register from "./routes/Register";
import HelloWorld from "./routes/HelloWorld";
import User from "./routes/User";
import Profile from "./routes/Profile";
import Following from "./routes/Following";

import { auth } from "./config/firebase";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    })
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/seguindo" element={<Following/>}/>
        <Route path="/comunidades" element={<Community/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registro" element={<Register/>}/>
        <Route path="/user/:uid" element={<User></User>}></Route>
        <Route path="/helloworld" element={<HelloWorld/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App