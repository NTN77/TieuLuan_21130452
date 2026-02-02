import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8085/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message);
            }

            const data = await response.json();
            console.log(data);

           if(data.code === 200){
               // Lưu token vào localStorage để giữ đăng nhập
               localStorage.setItem("id", data.result.userResponse.id);
               localStorage.setItem("email", data.result.userResponse.email);
               localStorage.setItem("name",data.result.userResponse.name);
               localStorage.setItem("role",data.result.userResponse.role);
               localStorage.setItem("token",data.result.token);

               // Chuyển hướng sang trang home
               const role = data.result.userResponse.role;
               const roleAdmin = role.split(" ").includes("ROLE_ADMIN");
               const roleUser = role.split(" ").includes("ROLE_USER");
               if(roleAdmin){
                   window.location.href = "/messageAdmin";
               } else if(roleUser){
                   window.location.href = "/messageUser";
               }
           }else{
               setError(data.message);
           }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ width: "500px", borderRadius: "15px" }}>
                <h3 className="text-center mb-4">Đăng nhập</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Nhập email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Mật khẩu</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Nhập mật khẩu..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="text-danger">{error}</p>}

                    <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                        {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </form>

                <p className="text-center mt-3">
                    Chưa có tài khoản? <a href="/registry">Đăng ký</a>
                </p>
            </div>
        </div>
    );
}

export default Login;
