import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';


import Login from "./Login";
import MessageAdmin from "./MessageAdmin";
import MessageUser from "./MessageUser";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<Login/>}/>
            <Route path={"/messageAdmin"} element={<MessageAdmin/>}/>
            <Route path={"messageUser"} element={<MessageUser/>}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
