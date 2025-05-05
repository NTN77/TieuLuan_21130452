import {IoMdArrowRoundBack} from "react-icons/io";
import React from "react";
import SignUpSPB1 from "../assets/SignUpSPB1.png"
import SignUpSPB2 from "../assets/SignUpSPB2.png"
import SignUpSPB3 from "../assets/SignUpB3.png"
import SignUpSPB4 from "../assets/SignUpSPB4.png"
import SignUpSPB5 from "../assets/SignUpSPB5.png"
import SignUpSPB6 from "../assets/SignUpB6.png"
import "./PopUp.css"
import {Link} from "react-router-dom";
const PopUpInformation = ({cancel}) => {

    return(
        <div className={"containerScreen pb-5"}>
            <div className={"containerSPInformation w-75 mx-auto"}>
                <div className={"d-flex"}>
                    <button onClick={cancel}><IoMdArrowRoundBack className={"fs-1"} /></button>
                    <h3 className={"d-flex mx-auto"}>HƯỚNG DẪN ĐĂNG KÝ VÉ CÁ NHÂN</h3>
                </div>
                <div>
                    <div>
                        <strong>Tại sao tôi cần tài khoản của NTNRunning?</strong>
                        <p className={"m-0"}>- Có tài khoản trên NTNRunning, bạn có thể thực hiện được việc như sau:</p>
                        <p className={"m-0 fst-italic"}>+ Đăng ký vé sự kiện chay bộ trên NTNRunning</p>
                        <p className={"m-0 fst-italic"}>+ Lưu trữ đơn hàng</p>
                        <p className={"m-0 fst-italic"}>+ Kiểm tra thông tin của bạn trên sự kiện đã đăng ký</p>
                        <p className={"m-0 fst-italic"}>+ ...</p>
                    </div>

                    <div className={"guideSignUp"}>
                        <strong>Hướng dẫn tạo tài khoản trên NTNRunning</strong>
                        <p><strong>Bước 1:</strong> Truy cập vào website NTNRunning <Link to={"/"}><strong className={"fst-italic"}>Tại đây</strong></Link></p>
                        <p><strong>Bước 2:</strong> Nhấn "Đăng Nhập" ở góc phải trên màn hình</p>
                        <img src={SignUpSPB1} className={"img-fluid"} alt={"support"}/>
                        <p className={"mt-3"}> Chọn "Đăng Ký" hoặc đăng ký nhanh bằng "Google" hoặc "Facebook"</p>
                        <img src={SignUpSPB2} className={"img-fluid"} alt={"support"}/>
                        <p className={"mt-3"}><strong>Bước 3:</strong> Điền đầy đủ thông tin</p>
                        <img src={SignUpSPB3} className={"img-fluid"} alt={"support"}/>
                        <p className={"mt-3"}>Nhấn nút "Lấy Mã" để lấy mã xác nhận trong email vừa điền</p>
                        <img src={SignUpSPB4} className={"img-fluid"} alt={"support"}/>
                        <p className={"mt-3"}> Vào email vừa đăng ký để nhận mã</p>
                        <img src={SignUpSPB5} className={"img-fluid"} alt={"support"}/>
                        <p className={"mt-3"}><strong>Bước 4: </strong>Nhấn "Đăng Ký" sau khi điền mã xác nhận</p>
                        <img src={SignUpSPB6} className={"img-fluid"} alt={"support"}/>
                        <p className={"mt-3 d-flex justify-content-center"}><strong>Hoàn Thành!</strong></p>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default PopUpInformation;
