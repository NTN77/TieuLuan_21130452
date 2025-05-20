import "./PopUpConfirm.css"
import React, {useContext, useState} from "react";
import {IoMdArrowRoundBack} from "react-icons/io";
import {AuthContext} from "../../Context/AuthContext.tsx";
import Swal from "sweetalert2";
import Loading from "../../Payment/Loading.tsx";
const PopUpConfirm = ({customer,cancelConfirm,customerList}) => {
    const [bib,setBib] = useState();
    const [loading,setLoading] = useState(false);
    const { tokenContext } = useContext(AuthContext);
    const [validateBib,setValidateBib] = useState(false);

    const onChangeBib = (bib) => {
        setBib(bib);
    }

    const validateB = (bibCurrent) =>{
        const exists = customerList.some((customer) => customer.bib === bibCurrent);
        if(exists){
            setValidateBib(true);
        }else{
            setValidateBib(false);
        }
    }

    const updateBibAndSendEmail = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/TicketRunning/admin/updateBibAndSendMail?idCustomer=${customer.id}&bib=${bib}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${tokenContext}`
                },
            });

            if (!response.ok) {
                throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
            }
            setLoading(false);
            Swal.fire({
                title: "Gửi Thành Công!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
            const data = await response.json();
            console.log("Gửi thành công!", data);
            cancelConfirm();

        } catch (error) {
            setLoading(false);
            console.error("Lỗi khi gửi thông tin:", error);
        }
    };
    return(
        <div className={"overlay"}>
            <div className={"containerConfirm p-4"}>
                <div className="d-flex mt-3 justify-content-between align-items-center">
                    <IoMdArrowRoundBack onClick={cancelConfirm} className="cursor-pointer fs-5 me-5"/>
                    <h3 className="text-center mb-0 mx-auto">Xác thực và gửi thông tin</h3>
                </div>
                <div className={"d-flex"}>
                    <label className={"fw-bold"}>Họ và tên: </label>
                    <p className={"ms-2 mb-0"}>{customer.userName}</p>
                </div>
                <div className={"d-flex"}>
                    <label className={"fw-bold"}>Cự ly: </label>
                    <p className={"mb-0 ms-2"}>{customer.eventDistance}</p>
                </div>
                <div>
                    <label className={"fw-bold me-2"}>Nhập số bib:</label>
                    <input type={"text"} value={bib} onChange={(e) => {
                        onChangeBib(e.target.value);validateB(e.target.value)
                    }}
                           placeholder={"Nhập số bib ..."} required={true}/>
                    {validateBib && <p className={"text-danger d-flex justify-content-center mt-2 mb-0"}>Số bib đã có!</p>}
                </div>
                <div className={" mt-4 d-flex justify-content-center"}>
                    <button type={"submit"} className={"btnSend bg-success text-white"} onClick={updateBibAndSendEmail} disabled={validateBib}>Gửi thông tin</button>
                </div>
            </div>
            {loading && (<Loading/>)}
        </div>
    )
}
export default PopUpConfirm;
