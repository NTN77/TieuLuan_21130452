import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import SignIn from "./Login/SignIn.tsx";
import Admin from "./Admin/Admin.tsx";
import Menubar from "./MenuBar_Footer/MenuBar.tsx";
import Footer from "./MenuBar_Footer/Footer.tsx";
import {GoogleOAuthProvider} from "@react-oauth/google";
import Event_List from "./Event_Detail/Event_List.tsx";
import CreateEvent from "./Event_Detail/CreateEvent.tsx";

function App() {
    const location = useLocation();
    const showMenubar = location.pathname !== "/Login" && location.pathname !== "/SignIn";

    return (
        <GoogleOAuthProvider clientId="697065721574-jb6163gmpmhn607933dgvmbettr2c2fj.apps.googleusercontent.com">
        <div >

            {showMenubar && <Menubar/>}
            <Routes>
                <Route path="/Login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/Admin" element={<Admin />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/Event" element={<Event_List />} />
                <Route path="/createEvent" element={<CreateEvent/>} />
            </Routes>
            {showMenubar && <Footer/>}
        </div>
    </GoogleOAuthProvider>

);
}

export default App;
