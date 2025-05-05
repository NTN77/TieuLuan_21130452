import {IoMdArrowRoundBack} from "react-icons/io";
import React from "react";
import SignUpSPB1 from "../assets/signUpEventB1.png"
import SignUpSPB1_1 from "../assets/signUpEventB1_1.png"
import SignUpSPB2 from "../assets/signUpEventB2.png"
import SignUpSPB3 from "../assets/SignUpEventB3.png"
import SignUpSPB4 from "../assets/signUpEventB4.png"
import SignUpSPB5 from "../assets/signUpEventB5.png"
import "./PopUp.css"
import {Link} from "react-router-dom";
const PopUpSignUpEvent = ({cancel}) => {

    return(
        <div className={"containerScreen pb-5"}>
            <div className={"containerSPInformation w-75 mx-auto"}>
                <div className={"d-flex"}>
                    <button onClick={cancel}><IoMdArrowRoundBack className={"fs-1"} /></button>
                    <h3 className={"d-flex mx-auto"}>HƯỚNG DẪN ĐĂNG KÝ SỰ KIỆN</h3>
                </div>
                <div className={"guideSignUp mt-3"}>
                    <strong>Hướng dẫn đăng ký sự kiện trên NTNRunning</strong>
                    <p className={"m-0"}><strong>Bước 1:</strong> Truy cập vào website NTNRunning <Link to={"/"}><strong
                        className={"fst-italic"}>Tại đây</strong></Link></p>
                    <p className={"m-0"}><strong className={"text-danger"}>Lưu ý:</strong> Bạn cần đăng nhập tài khoản
                        trước khi đăng ký sự kiện</p>
                    <p className={"m-0 mt-3"}><strong>Bước 2:</strong> Nhấn nút "Đăng Ký" của sự kiện bạn muốn tham gia</p>
                    <img src={SignUpSPB1} className={"img-fluid mt-4"} alt={"support"}/>
                    <img src={SignUpSPB1_1} className={"img-fluid mt-4"} alt={"support"}/>

                    <p className={"mt-3"}><strong>Bước 3:</strong> Điền đầy đủ thông tin cá nhân vào form</p>
                    <img src={SignUpSPB2} className={"img-fluid"} alt={"support"}/>
                    <p className={"mt-3"}>Sau khi điền đầy đủ thông tin sẽ có giá, cự ly đăng ký và chọn phương thức thanh toán</p>
                    <img src={SignUpSPB3} className={"img-fluid"} alt={"support"}/>
                    <p className={"mt-3"}>Trang thanh toán VNPAY</p>
                    <img src={SignUpSPB4} className={"img-fluid"} alt={"support"}/>
                    <p className={"mt-3"}><strong>Bước 4:</strong> Sau khi thanh toán sẽ nhận được email "Xác Nhận Thanh Toán Thành Công"</p>
                    <img src={SignUpSPB5} className={"img-fluid"} alt={"support"}/>
                    <p className={"mt-3 d-flex justify-content-center"}><strong>Hoàn Thành!</strong></p>

                </div>
            </div>
        </div>
    )
}
export default PopUpSignUpEvent;
