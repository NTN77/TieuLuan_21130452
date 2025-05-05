import {IoMdArrowRoundBack} from "react-icons/io";
import React from "react";
import SignUpSPB1 from "../assets/informationTicket.png"
import SignUpSPB1_1 from "../assets/informationTicketB1.png"

import SignUpSPB2 from "../assets/informationTicketB2.png"
import SignUpSPB3 from "../assets/SignUpEventB3.png"
import SignUpSPB4 from "../assets/signUpEventB4.png"
import SignUpSPB5 from "../assets/signUpEventB5.png"
import "./PopUp.css"
import {Link} from "react-router-dom";
const PopUpInforTicket = ({cancel}) => {

    return(
        <div className={"containerScreen pb-5"}>
            <div className={"containerSPInformation w-75 mx-auto"}>
                <div className={"d-flex"}>
                    <button onClick={cancel}><IoMdArrowRoundBack className={"fs-1"} /></button>
                    <h3 className={"d-flex mx-auto"}>HƯỚNG DẪN XEM THÔNG TIN VÉ ĐÃ ĐĂNG KÝ</h3>
                </div>
                <div className={"guideSignUp mt-3"}>
                    <strong>Hướng dẫn xem thông tin vé đăng ký trên NTNRunning</strong>
                    <p className={"m-0"}><strong>Bước 1:</strong> Truy cập vào website NTNRunning <Link to={"/"}><strong
                        className={"fst-italic"}>Tại đây</strong></Link></p>
                    <p className={"m-0"}><strong className={"text-danger"}>Lưu ý:</strong> Bạn cần đăng nhập tài khoản
                        trước khi xem vé đăng ký sự kiện</p>
                    <p className={"m-0 mt-3"}><strong>Bước 2:</strong> Nhấn nút "Vé của tôi" ở thanh menu</p>
                    <img src={SignUpSPB1} className={"img-fluid mt-4"} alt={"support"}/>
                    <p className={"m-0 mt-3"}>Trang "Vé của tôi"</p>
                    <img src={SignUpSPB1_1} className={"img-fluid mt-4"} alt={"support"}/>
                    <p className={"mt-3"}><strong>Bước 3:</strong> Nhấn vào sự kiện muốn xem thông tin</p>
                    <img src={SignUpSPB2} className={"img-fluid"} alt={"support"}/>
                    <p className={"mt-3 d-flex justify-content-center"}><strong>Hoàn Thành!</strong></p>

                </div>
            </div>
        </div>
    )
}
export default PopUpInforTicket;
