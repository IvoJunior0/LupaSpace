import { useEffect, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

// Rotas
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import HelloWorld from "./routes/HelloWorld";

import { auth } from "./config/firebase";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user.email);
    })
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registro" element={<Register/>}/>
        <Route path="/helloworld" element={<HelloWorld/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App