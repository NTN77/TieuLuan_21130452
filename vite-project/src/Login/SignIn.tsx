import React, {useContext, useState} from "react";
import { FaEye, FaEyeSlash} from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";
import background from '../assets/background.jpg';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext.tsx";

const SignIn = () => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);

    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirm,setConfirm] = useState("");
    const [birthday,setBirthday] = useState("");

    const [error,setError] = useState("");
    const [inform,setInform] = useState("");



    const container = {
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100%',
    }

    const {
        setTokenContext,
        setUsernameContext,
        setRoleContext,
        setEmailContext,
        setStatus,
    } = useContext(AuthContext);

    const signIn = async (e: React.FormEvent) => {
        e.preventDefault();
        if(password !== confirm ){
            setError("Mật khẩu không khớp!");
            return
        }
        const reponse = await fetch("http://localhost:8080/TicketRunning/user", {
          method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userName: userName,
                email: email,
                password: password,
                birthday: birthday
            }),
        });
        if(reponse.ok) {
            const data = await reponse.json();
            if (data.result.authenticated) {
                setTokenContext(data.result.token);
                setError("");
                setInform("Đăng Ký Thành Công!");
                //Lấy thông tin user
                const userReponse = await fetch("http://localhost:8080/TicketRunning/user/my-info",{
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${data.result.token}`,
                    },
                });
                if(userReponse.ok){
                    const dataUser = await userReponse.json();
                    setUsernameContext(dataUser.result.username);
                    setRoleContext(dataUser.result.role.name);
                    setEmailContext(dataUser.result.email);
                    setStatus(dataUser.result.status);
                }
                navigate("/Home");
            }
        }else{
            const  err = await reponse.json();
            setError(err.message);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light " style={container}>
            <div className="card shadow-lg p-4 pt-2" style={{width: "30rem", height: "35rem", borderRadius: "20px"}}>
                <div className={"d-flex align-items-center justify-content-between"}>
                    <div className={"fs-2 mb-2"} style={{cursor: "pointer"}} onClick={() => navigate("/")}>
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
                            onChange={(e) => setEmail(e.target.value)}
                            required={true}
                        />
                    </div>
                    <div className=" position-relative fs-6 mb-2">
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

                    <div className=" position-relative fs-6 mb-1">
                        <label className="form-label">Nhập Lại Mật khẩu:</label>
                        <input
                            type={showPassword2 ? "text" : "password"}
                            className="form-control fs-6"
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
                        <label className="form-label fs-6 ">Ngày Sinh:</label>
                        <input
                            type="date"
                            className="form-control fs-6"
                            onChange={(e) => setBirthday(e.target.value)}
                            required={true}
                        />
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
        </div>
    );
};
export default SignIn;
