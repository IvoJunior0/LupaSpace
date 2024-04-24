import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import {  createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importações das rotas/endpoints
import Home from './routes/Home.jsx';
import Login from './routes/Login.jsx';
import Register from './routes/Register.jsx';
import HelloWorld from './routes/HelloWorld.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "helloworld",
    element: <HelloWorld/>
  },
  {
    path: "login",
    element: <Login/>
  },
  {
    path: "registro",
    element: <Register/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
