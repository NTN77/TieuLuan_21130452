import React, {useContext, useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import background from '../assets/background.jpg';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext.tsx";
import axios from "axios";
import {GoogleLogin} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import FacebookLogin from 'react-facebook-login';
import './Login.css'
import {IoMdArrowRoundBack} from "react-icons/io";

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
        height: '130vh',
        width: '100%',
    }
    const {
        setTokenContext,

    } = useContext(AuthContext);
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
                    setError("");
                    setInform("Đăng Nhập Thành Công!");
                    sessionStorage.setItem('token',data.result.token);
                    setTokenContext(data.result.token);
                    navigate("/Admin");
                } else {
                    sessionStorage.setItem('token',data.result.token)
                    setTokenContext(data.result.token);
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
    // Đăng nhập gg vs face
    interface GoogleUser {
        email: string;
        name: string;
    }
    const handleGoogleLogin = async (credentialResponse: any) => {
        if (credentialResponse.credential) {
            const decoded: GoogleUser = jwtDecode<GoogleUser>(credentialResponse.credential.trim());
            const userData = {
                email: decoded.email,
                username: decoded.name,
            };
            // Gửi dữ liệu về BE
            const reponse = await fetch("http://localhost:8080/TicketRunning/auth/loginGG", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            if(reponse.ok) {
                const data = await reponse.json();
                if (data.result.authenticated) {
                    if (data.result.role === "ADMIN") {
                        setError("");
                        setInform("Đăng Nhập Thành Công!");
                        sessionStorage.setItem('token',data.result.token);
                        setTokenContext(data.result.token);
                        navigate("/Admin");
                    } else {
                        sessionStorage.setItem('token',data.result.token)
                        setTokenContext(data.result.token);
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
    };
    const handleGoogleSuccess = async (response) => {
        const { credential } = response;
        try {
            const res = await axios.post("http://localhost:8080/TicketRunning/auth/google", { tokenId: credential });
            const data = res.data;
            if (data.result.authenticated) {
                if (data.result.role === "ADMIN") {
                    setError("");
                    setInform("Đăng Nhập Thành Công!");
                    sessionStorage.setItem('token',data.result.token);
                    setTokenContext(data.result.token);
                    navigate("/Admin");
                } else {
                    sessionStorage.setItem('token',data.result.token)
                    setTokenContext(data.result.token);
                    setError("");
                    setInform("Đăng Nhập Thành Công!");
                    navigate("/");
                    }
                } else {
                    setError(data.message);
            }
        } catch (error) {
            console.error("Google login failed:", error);
            setError("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    const responseFacebook = async (response) => {
        console.log(response);
        if (response) {
            const userData = {
                email: response.email,
                username: response.name,
            };
            // Gửi dữ liệu về BE
            const reponse2 = await fetch("http://localhost:8080/TicketRunning/auth/loginGG", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
            if(reponse2.ok) {
                const data = await reponse2.json();
                if (data.result.authenticated) {
                    if (data.result.role === "ADMIN") {
                        setError("");
                        setInform("Đăng Nhập Thành Công!");
                        sessionStorage.setItem('token',data.result.token);
                        setTokenContext(data.result.token);
                        navigate("/Admin");
                    } else {
                        sessionStorage.setItem('token',data.result.token)
                        setTokenContext(data.result.token);
                        setError("");
                        setInform("Đăng Nhập Thành Công!");
                        navigate("/");
                    }
                } else {
                    const err = await reponse2.json();
                    setError(err.message);
                }
            }
        }
    };

    const componentClicked = (event) => {
        console.log('Facebook button clicked');
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light " style={container}>
            <div className="card shadow-lg p-4" style={{width: "30rem", height: "29rem", borderRadius: "20px"}}>
                <div className={"d-flex d-flex align-items-center justify-content-between"}>
                    <div className={"fs-2 mb-2"} style={{cursor: "pointer"}} onClick={() => navigate("/")}>
                        <IoMdArrowRoundBack/>
                    </div>
                    <h2 className="text-center fs-3 flex-grow-1 me-4">Đăng Nhập</h2>
                </div>

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
                        {inform && <p className={"text-bg-light text-center text-success"}>{inform}</p>}

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
                <div className={"mt-3"}>
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                    <FacebookLogin
                        appId="616119721124541"
                        autoLoad={true}
                        fields="name,email"
                        scope="email"
                        onClick={componentClicked}
                        callback={responseFacebook}
                        textButton="Đăng nhập với Facebook"
                        cssClass="cssFace"
                        icon="fa-facebook"
                    />
                </div>
            </div>

        </div>
    );
};
export default Login;
