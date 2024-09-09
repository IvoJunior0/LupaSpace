// Hooks
import { useEffect, useState } from "react";

// React Router
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Firebase
import { auth } from "./config/firebase";

// Rotas
import Home from "./routes/Home";
import CommunityHub from "./routes/CommunityHub";
import Login from "./routes/Login";
import Register from "./routes/Register";
import HelloWorld from "./routes/HelloWorld";
import User from "./routes/User";
import Following from "./routes/Following";
import CommunityPage from "./routes/CommunityPage";
import SubforumPage from "./routes/SubforumPage";
import TopicPage from "./routes/TopicPage";
import CreateTopicPage from "./routes/CreateTopicPage";
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
        <Route path="/" element={<Home/>}/>
        <Route path="/seguindo" element={<Following/>}/>
        <Route path="/comunidades" element={<CommunityHub/>}>
          <Route path=":communityID" element={<CommunityPage/>}>
            <Route path=":subforumID" element={<SubforumPage/>}>
              <Route path="postar" element={<CreateTopicPage/>}></Route>
            </Route>  
          </Route>
        </Route>
        <Route path="/comunidades/:communityID/:subforumID/:topicID" element={<TopicPage/>} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/registro" element={<Register/>}/>
        <Route path="/user/:uid" element={<User></User>}></Route>
        <Route path="/helloworld" element={<HelloWorld/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App