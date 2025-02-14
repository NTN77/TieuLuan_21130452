import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";

function App() {
    return (
        <div>
            {/* Định nghĩa các route */}
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/Login" element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
