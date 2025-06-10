import React, {useContext, useState} from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import background from '../assets/background.jpg';
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext.tsx";
import axios from "axios";
import {GoogleLogin} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import FacebookLogin from 'react-facebook-login';
import './Login.css'
import {IoMdArrowRoundBack} from "react-icons/io";
import Loading from "../Payment/Loading.tsx";

const Login = () => {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [error,setError] = useState("");
    const [inform,setInform] = useState("");
    const [loading, setLoading] = useState(false);
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
        setLoading(true);
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
            const allowedRoles = ["ADMIN", "MANAGER"];
            if (data.result.authenticated) {
                if (allowedRoles.includes(data.result.role)) {
                    setLoading(false);
                    setError("");
                    setInform("Đăng Nhập Thành Công!");
                    sessionStorage.setItem('token',data.result.token);
                    setTokenContext(data.result.token);
                    navigate("/Admin");
                } else {
                    setLoading(false);
                    sessionStorage.setItem('token',data.result.token)
                    setTokenContext(data.result.token);
                    setError("");
                    setInform("Đăng Nhập Thành Công!");
                    navigate("/");
                }
            } else {
                setLoading(false);
                const err = await reponse.json();
                setError(err.message);
            }
        }else {
            const err = await reponse.json();
            setLoading(false);
            setError(err.message);
        }
    }
    // Đăng nhập gg vs face
    interface GoogleUser {
        email: string;
        name: string;
    }
    const handleGoogleLogin = async (credentialResponse: any) => {
        setLoading(true);

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
                const allowedRoles = ["ADMIN", "MANAGER"];
                if (data.result.authenticated) {
                    if (allowedRoles.includes(data.result.role)) {
                        setError("");
                        setLoading(false);
                        setInform("Đăng Nhập Thành Công!");
                        sessionStorage.setItem('token',data.result.token);
                        setTokenContext(data.result.token);

                        navigate("/Admin");
                    } else {
                        setLoading(false);
                        sessionStorage.setItem('token',data.result.token)
                        setTokenContext(data.result.token);
                        setError("");
                        setInform("Đăng Nhập Thành Công!");
                        navigate("/");
                    }
                } else {
                    setLoading(false);
                    const err = await reponse.json();
                    setError(err.message);
                }
            }
        }
    };
    const responseFacebook = async (response) => {
        setLoading(true);
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
                setLoading(false);
                const allowedRoles = ["ADMIN", "MANAGER"];
                if (data.result.authenticated) {
                    if (allowedRoles.includes(data.result.role)) {
                        setError("");
                        setInform("Đăng Nhập Thành Công!");
                        sessionStorage.setItem('token',data.result.token);
                        setTokenContext(data.result.token);
                        navigate("/Admin");
                    } else {
                        setLoading(false);
                        sessionStorage.setItem('token',data.result.token)
                        setTokenContext(data.result.token);
                        setError("");
                        setInform("Đăng Nhập Thành Công!");
                        navigate("/");
                    }
                } else {
                    setLoading(false);
                    const err = await reponse2.json();
                    setError(err.message);
                }
            }
        }
    };


    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light " style={container}>
            {loading && (<Loading/>)}
            <div className="card shadow-lg p-4" style={{width: "30rem", height: "32rem", borderRadius: "20px"}}>
                <div className={"d-flex d-flex align-items-center justify-content-between"}>
                    <Link to={"/"} className={"fs-2 mb-2"} style={{cursor: "pointer"}}>
                        <IoMdArrowRoundBack/>
                    </Link>
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
                        className="btn btn-primary w-100 "

                    >
                        Đăng Nhập
                    </button>
                </form>
                <div className={"signIn d-flex justify-content-center mt-2"}>
                    <span>Bạn chưa có tài khoản? </span>
                    <span className={"ms-1"} onClick={() => navigate("/Register")}
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
                        autoLoad={false}
                        fields="name,email"
                        scope="email"
                        callback={responseFacebook}
                        onFailure={(error) => console.error("Facebook login error:", error)}
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
