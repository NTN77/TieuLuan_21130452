import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import background from '../assets/background.jpg';
import {useNavigate} from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [error,setError] = useState("");
    const [inform,setInform] = useState("");

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const container = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
    }

    const signIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const reponse = await fetch("http://localhost:8080/TicketRunning/auth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });
        if(reponse.ok) {
            const data = await reponse.json();
            if (data.result.authenticated) {
                if (data.result.role === "ADMIN") {
                    localStorage.setItem("token", data.result.token);
                    setError("");
                    setInform("Đăng Nhập Thành Công!");
                    navigate("/Admin");
                } else {
                    localStorage.setItem("token", data.result.token);
                    setError("");
                    setInform("Đăng Nhập Thành Công!");
                    navigate("/");
                }
            } else {
                const err = await reponse.json();
                setError(err.message);
            }
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light " style={container}>
            <div className="card shadow-lg p-4" style={{width: "30rem", height: "25rem", borderRadius: "20px"}}>
                <h2 className="text-center mb-2 fs-2">Đăng Nhập</h2>

                <form onSubmit={signIn}>
                    <div className="mb-2">
                        <label className="form-label fs-6 ">Email:</label>
                        <input
                            type="email"
                            className="form-control fs-6"
                            placeholder="Nhập email của bạn"
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div className=" position-relative fs-6 mb-4">
                        <label className="form-label">Mật khẩu:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control fs-6"
                            placeholder="Nhập mật khẩu"
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                        />
                        <span
                            className="position-absolute top-50 end-0 translate-middle-y me-3 mt-3"
                            style={{cursor: "pointer"}}
                            onClick={() => setShowPassword(!showPassword)}
                        >
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </span>
                    </div>
                    <div>
                        {error && <p className={"text-danger text-center"}>{error}</p>}
                        {inform && <p className={"text-bg-light text-center"}>{inform}</p>}

                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Đăng Nhập
                    </button>
                </form>
                <div className={"signIn d-flex justify-content-center mt-2"}>
                    <span>Bạn chưa có tài khoản? </span>
                    <span className={"ms-1"} onClick={() => navigate("/SignIn")}
                          style={{cursor: "pointer", color: "red", textDecoration: "underline"}}>Đăng Ký</span>
                </div>
            </div>
        </div>
    );
};
export default Login;
