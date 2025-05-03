import React, {useContext, useState} from "react";
import { FaEye, FaEyeSlash} from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";
import background from '../assets/background.jpg';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext.tsx";
import Swal from "sweetalert2";
import Loading from "../Payment/Loading.tsx";


const SignIn = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);

    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [code,setCode] = useState("");
    const [codeCorrect,setCodeCorrect] = useState("");
    const [confirm,setConfirm] = useState("");
    const [error,setError] = useState("");
    const [inform,setInform] = useState("");
    const [loading,setLoading] = useState(false);
    const [isValid, setIsValid] = useState(true);




    const container = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
    }
    const buttonCode = {
        backgroundColor: 'red',
        color: 'white',
        width: '30%',
        marginLeft: '10px',
    }

    const {
        setTokenContext,
    } = useContext(AuthContext);

    const signIn = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        if(password !== confirm ){
            setError("Mật khẩu không khớp!");
            setLoading(false);
            return
        }
        if(code == ""){
            setError("Chưa điền mã xác nhận!");
            setLoading(false);
            return
        }else if(code != codeCorrect){
            setError("Sai mã xác nhận!");
            setLoading(false);
            return;
        }else {
            const reponse = await fetch("http://localhost:8080/TicketRunning/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName: userName,
                    email: email,
                    password: password,
                }),
            });
            if (reponse.ok) {
                setLoading(false);
                const data = await reponse.json();
                if (data.result.authenticated) {
                    Swal.fire({
                        title: "Đăng Ký Thành Công!",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                    setTokenContext(data.result.token);
                    setError("");
                    setInform("Đăng Ký Thành Công!");
                    sessionStorage.setItem('token', data.result.token);
                    setTokenContext(data.result.token);
                    navigate("/");
                }
            } else {
                setLoading(false);
                const err = await reponse.json();
                setError(err.message);
                setCodeCorrect("");
            }
        }
    }
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };
    //Lấy mã xác nhận
    const sendCode = async (e: React.FormEvent) => {
        setLoading(true);
        e.preventDefault();
        if(email == ""){
            setError("Cần điền email để nhận mã xác nhận!");
            setLoading(false);
            return;
        }
        if(!isValid){
            setError("Email sai cú pháp!")
            setLoading(false);
            return;
        }
        setError("");
        const reponse = await fetch(`http://localhost:8080/TicketRunning/user/SignIn/sendCode?email=${email}`, {
            method: "POST",
        });
        if(reponse.ok) {
            setLoading(false);
            Swal.fire({
                title: "Lấy Mã Xác Nhận Thành Công!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
            const data = await reponse.json();
            if (data.result) {
                setCodeCorrect(data.result);
            }
        }else{
            setLoading(false);
            const  err = await reponse.json();
            setError(err.message);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light " style={container}>
            <div className="card shadow-lg p-4 pt-2" style={{width: "30rem", height: "35rem", borderRadius: "20px"}}>
                <div className={"d-flex align-items-center justify-content-between"}>
                    <div className={"fs-2 mb-2"} style={{cursor: "pointer"}} onClick={() => navigate("/Login")}>
                        <IoMdArrowRoundBack/>
                    </div>
                    <h2 className="text-center fs-3 flex-grow-1 me-4">Đăng Ký</h2>
                </div>
                <form onSubmit={signIn}>
                    <div className="mb-1">
                        <label className="form-label ">Tên tài khoản:</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập tên tài khoản"
                            onChange={(e) => setUserName(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div className="mb-1">
                        <label className="form-label fs-6 ">Email:</label>
                        <input
                            type="email"
                            className="form-control fs-6"
                            placeholder="Nhập email của bạn"
                            onChange={(e) =>{ setEmail(e.target.value);
                                setIsValid(validateEmail(e.target.value))
                            }}
                        required={true}
                        />
                    </div>
                    <div className=" position-relative fs-6 mb-2">
                        <label className="form-label">Mật khẩu:</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control fs-6"
                            minLength={8}
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

                    <div className=" position-relative fs-6 mb-1">
                        <label className="form-label">Nhập Lại Mật khẩu:</label>
                        <input
                            type={showPassword2 ? "text" : "password"}
                            className="form-control fs-6"
                            minLength={8}
                            placeholder="Nhập lại mật khẩu"
                            onChange={(e) => setConfirm(e.target.value)}
                            required={true}
                        />
                        <span
                            className="position-absolute top-50 end-0 translate-middle-y me-3 mt-3"
                            style={{cursor: "pointer"}}
                            onClick={() => setShowPassword2(!showPassword2)}
                        >
              {showPassword2 ? <FaEyeSlash/> : <FaEye/>}
            </span>
                    </div>
                    <div className="mb-3">
                        <label className="form-label fs-6 ">Mã Xác Nhận:</label>
                        <div className={"d-flex"}>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setCode(e.target.value)}
                                required={true}
                            />
                            <button onClick={sendCode} style={buttonCode}>Lấy Mã</button>
                        </div>
                    </div>
                    <div>
                        {error && <p className={"text-danger text-center"}>{error}</p>}
                        {inform && <p className={"text-bg-light text-center"}>{inform}</p>}

                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Đăng Ký
                    </button>
                </form>

            </div>
            {loading && (<Loading/>)}
        </div>
    );
};
export default SignIn;
