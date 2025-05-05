import "./BTC.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {useEffect, useState} from "react";
const  BTC = () => {

    const [btc,SetBtc] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8080/TicketRunning/event/BTC`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Lỗi khi lấy dữ liệu!");
                }
                return response.json();
            })
            .then(data => {
                SetBtc(data.result);
            })
            .catch(error => console.error("Lỗi:", error));
    }, [btc]);
    return (
        <div className="logo-grid-container">
            {btc.map((logo) => (
                <div key={logo.id} className="logo-box">
                    <img src={logo.urlImage} alt={logo.name} className="logo-image"/>
                </div>
            ))}
        </div>
    )
}
export default BTC;
