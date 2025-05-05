import {useContext, useEffect, useState} from "react";
import {MdOutlineCancel} from "react-icons/md";
import {AuthContext} from "../../Context/AuthContext.tsx";
import Swal from "sweetalert2";
import "./PopUpedit.css"

const PopUpEdit = ({idUser,cancel}) => {
    const [userName,setUserName] = useState("");
    const [email,setEmail] = useState("");
    const [roleId,setRoleId] = useState();


    const {tokenContext } = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:8080/TicketRunning/admin/findByUser?idUser=${idUser}`, {
            headers: {
                "Authorization": `Bearer ${tokenContext}`
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Lỗi khi lấy dữ liệu!");
                }
                return response.json();
            })
            .then(data => {
                setUserName(data.result.username);
                setEmail(data.result.email);
                setRoleId(data.result.role.id);

            })
            .catch(error => console.error("Lỗi:", error));
    }, [idUser, tokenContext]);
    const saveInformation = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/TicketRunning/admin/updateInformation", {
                method: "POST",
                body: JSON.stringify({
                    newName: userName,
                    email: email,
                    idUser: idUser,
                    idRole: roleId,
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenContext}`
                },
            });

            if (!response.ok) {
                throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
            }
            Swal.fire({
                title: "Lưu Thành Công!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
            cancel();
        } catch (error) {
            console.error("Lỗi khi lưu:", error);
        }

    }
    const handleChange = (e) => {
        const newRoleId = e.target.value;
        setRoleId(newRoleId);
    };


    const roles = [
        { id: 1, name: "USER" },
        { id: 2, name: "MANAGER" },
    ];
    const sortedRoles = [
        ...roles.filter(role => role.id === roleId),
        ...roles.filter(role => role.id !== roleId)
    ];
    return(
        <div className={"overlay"}>
            <div className={"containerPopUp w-25 p-3"}>
                <div className="d-flex mt-3 justify-content-between align-items-center">
                    <h3 className="text-center mb-0">Chỉnh sửa tài khoản</h3>
                    <MdOutlineCancel onClick={cancel} className="cursor-pointer"/>
                </div>
                <form onSubmit={saveInformation}>
                    <div className={"mt-2"}>
                        <label>Họ và tên:</label>
                        <input type="text" className="form-control" value={userName}
                               onChange={(e) => setUserName(e.target.value)} required={true}/>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input type="email" className="form-control" value={email}
                               onChange={(e) => setEmail(e.target.value)} required={true}/>
                    </div>
                    <div>
                        <label>Role:</label>
                        <select id="role" value={roleId} onChange={handleChange} className={"w-100 "} style={{borderRadius:"20px"}}>
                            {sortedRoles.map(role => (
                                <option key={role.id} value={role.id}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button type={"submit"} className={"mt-3 d-flex mx-auto"}>Lưu</button>
                </form>
            </div>
        </div>
    )
}
export default PopUpEdit;
