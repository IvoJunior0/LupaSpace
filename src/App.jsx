import { useEffect, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

// Rotas
import Home from "./routes/Home";
import CommunityHub from "./routes/CommunityHub";
import Login from "./routes/Login";
import Register from "./routes/Register";
import HelloWorld from "./routes/HelloWorld";
import User from "./routes/User";
import Following from "./routes/Following";

import { auth } from "./config/firebase";
import Error from "./routes/Error";

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
        <Route path="*" element={<Error/>}/>
        <Route path="/" element={<Home/>}/>
        <Route path="/seguindo" element={<Following/>}/>
        <Route path="/comunidades" element={<CommunityHub/>}>
          <Route path=":communityID">
            <Route path=":subforumID">
              <Route path=":topicID">
                <Route path=":postID"></Route>
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registro" element={<Register/>}/>
        <Route path="/user/:uid" element={<User></User>}></Route>

        <Route path="/helloworld" element={<HelloWorld/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App