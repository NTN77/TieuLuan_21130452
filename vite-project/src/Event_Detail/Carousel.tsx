import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation, Pagination} from "swiper/modules";
import {Link, useNavigate} from "react-router-dom";
import {IoTimeOutline} from "react-icons/io5";
import {CiLocationOn} from "react-icons/ci";
import React, {useContext, useEffect, useState} from "react";
import {FaFireAlt} from "react-icons/fa";
import Swal from "sweetalert2";
import {AuthContext} from "../Context/AuthContext.tsx";

const Carousel = () => {
    const [events ,setEvents] = useState([]);
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
    const borderRadiusS = {
        border: "1px solid red",
        borderRadius: "50px",
        width: "fit-content",

    }
    const { tokenContext } = useContext(AuthContext);
    const navigation = useNavigate();
    const handleButtonSignUp = (id) => {
        if (tokenContext == null || tokenContext == "") {
            Swal.fire({
                title: "Bạn cần đăng nhập!",
                text: "Vui lòng đăng nhập để tiếp tục.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Đăng nhập",
                cancelButtonText: "Hủy",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigation("/Login");
                }
            });
        } else {
            navigation(`/Event/payment/${id}`);
        }
    };
    const Top6Sell = async () => {
        try {
            const response = await fetch(`http://localhost:8080/TicketRunning/event/eventTop6Sell`);
            if (!response.ok) {
                throw new Error("Lỗi khi lấy dữ liệu!");
            }
            const data = await response.json();
            setEvents(data.result);
        } catch (error) {
            console.error("Lỗi:", error);
        }
    };
    useEffect(() => {
        Top6Sell();
    }, []);
    return (
        <div>
            <div className={"d-flex ms-4 p-1 my-0"} style={borderRadiusS}>
                <FaFireAlt style={{color: "red"}} className={"fs-3"}/>
                <p className={"fw-bold fs-5 m-0"}>Sự Kiện Liên Quan</p>
            </div>
            <div className="carousel-intro">
                <Swiper
                    className={"py-3 px-1"}
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={10} // khoảng cách giữa các ảnh
                    slidesPerView={3} //sốluowuong anh
                    navigation
                    pagination={{clickable: true}}
                    autoplay={{delay: 5000, disableOnInteraction: false}}
                    loop={false}

                >
                    {events && events.map((img, index) => (
                        <SwiperSlide key={index} style={boxShadow} className={"p-2"}>
                            <Link to={`/Event/detailEvent/${img.id}`}>
                                <img src={img.avatar} alt={img.avatar} className="carousel-image"/>
                                <p className={"my-2 mx-3 fw-bold fs-6"}
                                   style={{color: "Black", height: "4rem"}}>{img.name}</p>
                                <p className={"mx-3 my-1"} style={{color: "Black"}}><IoTimeOutline
                                    style={{color: "red"}}/> {img.eventDate}</p>
                                <p className={"mx-3 my-1"} style={{color: "Black"}}><CiLocationOn
                                    style={{color: "red"}}/>{img.location}</p>
                                <div className={"d-flex mx-3"}>
                                    <div>
                                        {Number(img.minPrice) != 0 ? (
                                            <div><p className={"m-0 fw-light"}
                                                    style={{color: "black"}}>Chỉ
                                                từ</p>
                                                <strong
                                                    className={"fs-5 text-danger fst-italic"}>{new Intl.NumberFormat("vi-VN", {
                                                    style: "currency",
                                                    currency: "VND"
                                                }).format(img.minPrice)}</strong></div>
                                        ) : (
                                            <p className={"text-danger d-flex justify-content-center fw-bold fs-5"}>Hết
                                                Bán</p>)}

                                    </div>

                                    <div className={"ms-auto"}>

                                        {img.minPrice != 0 ? (
                                            <button onClick={() => handleButtonSignUp(img.id)}
                                                    className="hover_button p-3"
                                                    style={borderRadiusButton}>Đăng
                                                Ký</button>
                                        ) : (<button
                                                     disabled={true}
                                                     className="hover_button p-3"
                                                     style={borderRadiusButton}>Đăng
                                            Ký</button>)}

                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}
export default Carousel
