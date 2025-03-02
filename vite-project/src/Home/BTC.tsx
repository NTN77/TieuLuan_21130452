import "./BTC.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const  BTC = () => {
    const logos = [
        { id: 1, src: "/src/assets/footer1.jpg", alt: "Hope Box" },
        { id: 2, src: "/src/assets/footer1.jpg", alt: "Yeah1" },
        { id: 3, src: "/src/assets/footer1.jpg", alt: "Zaha Vietnam" },
        { id: 4, src: "/src/assets/footer1.jpg", alt: "Teelakow" },
        { id: 5, src: "/src/assets/footer1.jpg", alt: "VUD" },
        { id: 6, src: "/src/assets/footer1.jpg", alt: "Athlete Motter" },
        { id: 7, src: "/src/assets/footer1.jpg", alt: "Cambodia Events" },
        { id: 8, src: "/src/assets/footer1.jpg", alt: "VTV" },
        { id: 9, src: "/src/assets/footer1.jpg", alt: "SetiaBecamex" },
        { id: 10, src: "/src/assets/footer1.jpg", alt: "VNPR" },
        { id: 11, src: "/src/assets/footer1.jpg", alt: "Hanoi Event More" },
        { id: 12, src: "/src/assets/footer1.jpg", alt: "Nông Nghiệp Việt Nam" },
        { id: 13, src: "/src/assets/footer1.jpg", alt: "BDRC" },
        { id: 14, src: "/src/assets/footer1.jpg", alt: "Win Vietnam Marathon" },
        { id: 15, src: "/src/assets/footer1.jpg", alt: "Formula Racing Vietnam" },
    ];
    return (
        <div className="logo-grid-container">
            {logos.map((logo) => (
                <div key={logo.id} className="logo-box">
                    <img src={logo.src} alt={logo.alt} className="logo-image"/>
                </div>
            ))}
        </div>
    )
}
export default BTC;
