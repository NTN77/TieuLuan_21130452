import {Link} from "react-router-dom";
import footer from '../assets/footer1.jpg';
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import "./Footer.css";
const Footer = () => {
    const container_footer = {
        backgroundImage: `url(${footer})`,
        backgroundSize: "100%",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: "center",
        position: "relative",
        zIndex: 1,
        width: '100%',
        height:'25vw',
    }
    const  overplay = {
        backgroundColor: 'rgba(26,26,26,0.5)',
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        width: "100%",

    }
    return(
        <div className={"container_footer d-flex justify-content-center"} style={container_footer}>
            <div className={"d-flex"} style={overplay}>
                <div className={"content_1"}>
                    <div className={"d-flex justify-content-center"}>
                        <Link className="navbar-brand d-flex align-items-center" to="/home">
                            <img src="/iconMain.png" alt="Logo" width={"180vw"} className="me-2" style={{}}/>
                        </Link>
                    </div>
                    <p className="text-lg font-semibold fw-bold" >🏅 Chạy Vì Sức Khỏe – Đặt Vé, Xuất Phát, Chinh Phục!</p>
                    <p className="text-sm mt-2" >Đăng ký ngay để tham gia những giải chạy hấp dẫn nhất. Cùng nhau tạo nên
                        những bước chạy đầy cảm hứng!</p>
                </div>
                <div className={"content_2 d-flex justify-content-center align-content-center "}>
                    <div>
                        <h3  style={{color: "#03a9f4",marginLeft: "30%"}}>Liên Hệ</h3>
                        <p className={"fw-bold"}>CÔNG TY CỔ PHẦN NTN EVENT VIỆT NAM</p>
                        <p><strong>Địa chỉ:</strong> 38 Trần Phú, P.Bình Định, TX An Nhơn, T.Bình Định</p>
                        <p>Email: <strong>support@NTNRunning.net</strong></p>
                        <p>Hotline:<strong>1900 11 22 33</strong></p>
                        <p>(8:00 - 17:00 từ thứ Hai đến thứ Sáu)</p>
                        <FaFacebook style={{color: "#0866ff", fontSize: "3vw", marginRight: "20px",marginLeft:"25%"}}/>
                        <FaYoutube style={{color: "red", fontSize: "3vw"}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer;
