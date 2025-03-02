import {Autoplay, Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import "./Home.css"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {FaFireAlt} from "react-icons/fa";
import {IoTimeOutline} from "react-icons/io5";
import {CiLocationOn} from "react-icons/ci";
import {Link} from "react-router-dom";
import {MdDirectionsRun} from "react-icons/md";
import Event from "./Event.tsx";
import BTC from "./BTC.tsx";

const Home = () => {
    const images = [
        { src: "/src/assets/Banner.png", alt: "Marathon 1", id: "1", name: "Giải chạy chào mừng kỷ niệm thành lập Trường Đại học Nông Lâm", time:"26 tháng 3 ,2025",location: "TP.HCM",price: "355.000" },
        { src: "/src/assets/Banner.png", alt: "Marathon 2", id: "2", name: "Giải chạy chào mừng kỷ niệm thành lập Trường Đại học Nông Lâm", time:"26 tháng 3 ,2025",location: "TP.HCM",price: "355.000"},
        { src: "/src/assets/Banner.png", alt: "Marathon 3", id: "3", name: "Giải chạy chào mừng kỷ niệm thành lập Trường Đại học Nông Lâm", time:"26 tháng 3 ,2025",location: "TP.HCM",price: "355.000"},
        { src: "/src/assets/Banner.png", alt: "Marathon 4", id: "4", name: "Giải chạy chào mừng kỷ niệm thành lập Trường Đại học Nông Lâm", time:"26 tháng 3 ,2025",location: "TP.HCM",price: "355.000"},
        { src: "/src/assets/Banner.png", alt: "Marathon 5", id: "5", name: "Giải chạy chào mừng kỷ niệm thành lập Trường Đại học Nông Lâm", time:"26 tháng 3 ,2025",location: "TP.HCM",price: "355.000"},
        { src: "/src/assets/Banner.png", alt: "Marathon 6", id: "6", name: "Giải chạy chào mừng kỷ niệm thành lập Trường Đại học Nông Lâm", time:"26 tháng 3 ,2025",location: "TP.HCM",price: "355.000"},

    ];
    const borderRadiusS = {
        border: "1px solid red",
        borderRadius: "50px",
        width: "fit-content",

    }
    const boxShadow = {
        boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.2), -3px -3px 5px rgba(0, 0, 0, 0.2)',
        borderRadius: "10px",
    }
    const borderRadiusButton = {
        borderRadius: "20px",
        width: "fit-content",
        backgroundColor: "blue",
        color:"white"
    }
    const allEvent = {
        borderRadius: "20px",
        width: "fit-content",
        backgroundColor: "green",
        color:"white"
    }
        return(
            <div className={"container_home w-100 m-0 p-0"}>
                <div  className={"d-flex justify-content-center"} style={{width: "100%", marginTop: "7%"}}>
                    <img id={"Banner"} src="/src/assets/Banner.png" alt={"banner"}
                         style={{maxWidth: "95%", height: "auto", objectFit: "contain", borderRadius: "20px"}}/>
                </div>
                {/*Các giải chạy random*/}
                <div className="carousel-intro mt-4">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={10} // khoảng cách giữa các ảnh
                        slidesPerView={3} //sốluowuong anh
                        navigation
                        pagination={{clickable: true}}
                        autoplay={{delay: 3000, disableOnInteraction: false}}
                        loop={true}
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={index}>
                            <Link to={`/${img.id}`}>
                                    <img src={img.src} alt={img.alt} className="carousel-image"/>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className={"carousel-event"}>
                    <div className={"d-flex ms-4 p-1 my-0"} style={borderRadiusS}>
                        <FaFireAlt style={{color: "red"}} className={"fs-3"}/>
                        <p className={"fw-bold fs-5 m-0"}>Sự Kiện Nổi Bật</p>
                    </div>
                    {/*Các giải chạy có số lượng mua nhiều tối đa 6 giải*/}
                    <div className="carousel-intro">
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            spaceBetween={10} // khoảng cách giữa các ảnh
                            slidesPerView={3} //sốluowuong anh
                            navigation
                            pagination={{clickable: true}}
                            autoplay={{delay: 5000, disableOnInteraction: false}}
                            loop={true}
                        >
                            {images.map((img, index) => (
                                <SwiperSlide key={index} style={boxShadow} className={"p-2"}>
                                    <Link to={`/${img.id}`}>
                                        <img src={img.src} alt={img.alt} className="carousel-image"/>
                                        <p className={"my-2 mx-3 fw-bold fs-6"} style={{color: "Black"}}>{img.name}</p>
                                        <p className={"mx-3 my-1"} style={{color: "Black"}}><IoTimeOutline
                                            style={{color: "red"}}/> {img.time}</p>
                                        <p className={"mx-3 my-1"} style={{color: "Black"}}><CiLocationOn
                                            style={{color: "red"}}/>{img.location}</p>
                                        <div className={"d-flex mx-3"}>
                                            <div>
                                                <p className={"m-0 fw-light"} style={{color: "black"}}>Chỉ từ</p>
                                                <strong className={"fs-5 text-danger fst-italic"}>{img.price}đ</strong>
                                            </div>
                                            <div className={"ms-auto"}>
                                                <Link to={`/${img.id}`} className="hover_button p-3" style={borderRadiusButton}>Đăng
                                                    Ký</Link>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            {/*    Các giải chạy*/}
                <div className={"event"}>
                    <div className={"d-flex"}>
                        <div className={"d-flex ms-4 p-1 my-0"} style={borderRadiusS}>
                            <MdDirectionsRun style={{color: "red"}} className={"fs-3"}/>
                            <p className={"fw-bold fs-5 m-0"}>Sự Kiện Chạy Bộ</p>
                        </div>
                        <div className={"fw-bold ms-auto me-5 fs-5"} style={allEvent} >
                            <Link to={"#"} className={"hover_button p-3"} style={{color: "white"}}>
                                Xem tất cả
                            </Link>
                        </div>
                    </div>
                    <div className={"event_home"}>
                        {images.map((event,index) => (
                            <Event key={index} event={event}/>
                        ))}
                    </div>
                </div>
                {/*Logo BTC*/}
                <div className={"BTC"}>
                    <div className={"d-flex justify-content-center"} style={{color: "red"}}>
                        <h3 className={"mt-3"}>Ban Tổ Chức</h3>
                    </div>
                    <BTC/>
                </div>
            </div>
        )
};
export default Home;
