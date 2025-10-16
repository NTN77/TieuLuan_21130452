import { useState } from "react";

function Redistry() {
    const [name , setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch("http://localhost:8080/user/registry", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name, email, password }),
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.message);
            }

            const data = await response.json();

            // Lưu token vào localStorage để giữ đăng nhập
            localStorage.setItem("email", data.result.id);
            localStorage.setItem("email", data.result.email);
            localStorage.setItem("name",data.result.name);
            // Chuyển hướng sang trang home
            window.location.href = "/message";
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ width: "500px", borderRadius: "15px" }}>
                <h3 className="text-center mb-4">Đăng Ký</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name: </label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nhập tên người dùng..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

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
                        {loading ? "Đang đăng ký..." : "Đăng ký"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Redistry;
