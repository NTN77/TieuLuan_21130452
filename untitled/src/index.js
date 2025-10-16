import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Message from "./MessageHome";
import Registry from "./Registry";
import Chat from "./Chat";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              {/* Route cha */}
              <Route path="/" element={<Login />}/>
              <Route path="/chat" element={<Chat />} />
              <Route path="/message" element={<Message />} />
              <Route path="/registry" element={<Registry />} />

          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
