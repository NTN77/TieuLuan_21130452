import {FaRegUserCircle} from "react-icons/fa";
import {useContext, useState} from "react";
import {AuthContext} from "../Context/AuthContext.tsx";
import "./PopupEditInfo.css"
import Swal from "sweetalert2";
import {Button} from "reactstrap";
const PopupEditInfor = () => {
    const {idContext,usernameContext,emailContext,tokenContext} = useContext(AuthContext);
    const [newUserName,setNewUserName] = useState<string>(usernameContext);
    const saveEdit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/TicketRunning/user/changeInformation?idUser=${idContext}&newName=${encodeURIComponent(newUserName)}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${tokenContext}`,
                },
            });

            if (!response.ok) {
                throw new Error('Có lỗi xảy ra khi cập nhật tên!');
            }

            const result = await response.json();
            console.log(result);
            if(result.result == true) {
                Swal.fire({
                    title: "Lưu Thành Công!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            console.error(error);
            alert('Lỗi khi cập nhật!');
        }
    }
    return(
        <div className={"containerEditInfo mx-5 mt-3 p-3"}>
            <h3 className={"pt-3 text-info d-flex justify-content-center"}>Thông tin tài khoản</h3>
            <div className={"d-flex"}>
                <div>
                    <FaRegUserCircle className={"mx-5 text-info "} style={{fontSize:"150px"}}/>
                </div>
                <div className={"w-50"}>
                    <div className="mb-3 w-100">
                        <label className="form-label">Email:</label>
                        <input type="text" className="form-control" value={emailContext} style={{color:"gray"}}
                               onChange={(e) => emailContext(e.target.value)} disabled={true}/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Họ và tên:</label>
                        <input type="text" className="form-control" value={newUserName}
                               onChange={(e) => setNewUserName(e.target.value)}/>
                    </div>
                </div>
            </div>
            <Button className={"buttonEdit mx-auto d-flex bg-info-subtle text-black"} onClick={saveEdit}>Lưu thay đổi</Button>
        </div>
    )
}
export default PopupEditInfor;
