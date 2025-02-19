import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import SignIn from "./Login/SignIn.tsx";
import Admin from "./Admin/Admin.tsx";


function App() {
    return (

        <div>
            {/* Định nghĩa các route */}
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Home" element={<Home/>} />
                <Route path="/Admin" element={<Admin/>} />
                <Route path="/SignIn" element={<SignIn/>}/>
            </Routes>
        </div>
    );
}

export default App;
