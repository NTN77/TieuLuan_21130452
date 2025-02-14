import React, { useState } from "react";
import { FaEye, FaEyeSlash,FaGoogle ,FaFacebook } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const Login: React.FC = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light ">
            <div className="card shadow-lg p-4" style={{ width: "45rem", height: "30rem" ,borderRadius: "20px"}}>
                <h2 className="text-center mb-4 fs-1">Đăng Nhập</h2>

                <form>
                    <div className="mb-3">
                        <label className="form-label fs-4 ">Email</label>
                        <input
                            type="email"
                            className="form-control fs-5"
                            placeholder="Nhập email của bạn"
                        />
                    </div>
                    <div className="mb-3 position-relative fs-4">
                        <label className="form-label">Mật khẩu</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control fs-5"
                            placeholder="Nhập mật khẩu"
                        />
                        <span
                            className="position-absolute top-50 end-0 translate-middle-y me-3 mt-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowPassword(!showPassword)}
                        >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
                    </div>
                    <div className={"d-flex justify-content-center"} style={{fontSize: "3rem"}}>
                        <div style={{color: "#2986e7"}}>
                            <a href={"#"}>
                                <FaFacebook/>
                            </a>
                        </div>
                        <div  className={"ms-5 text-danger"}>
                            <a href={"#"}>
                                <FaGoogle/></a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Đăng Nhập
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
