import {Autoplay, Navigation, Pagination} from "swiper/modules";
import {Swiper, SwiperSlide} from "swiper/react";
import "./Home.css"
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import {FaFireAlt} from "react-icons/fa";
import { IoTimeOutline} from "react-icons/io5";
import {CiLocationOn} from "react-icons/ci";
import {Link, useNavigate} from "react-router-dom";
import {MdDirectionsRun} from "react-icons/md";
import Event from "./Event.tsx";
import BTC from "./BTC.tsx";
import React, {useContext, useEffect, useState} from "react";
import SearchBar from "../MenuBar_Footer/SearchBar.tsx";
import {AuthContext} from "../Context/AuthContext.tsx";
import Swal from "sweetalert2";
import Loading from "../Payment/Loading.tsx";

const Home = () => {
    const [event, setEvent] = useState([]);
    const [eventTopSell,setEventTopSell] = useState([]);
    const [loading,setLoading] = useState(true);
    const visibleSlides = 8; // số lượng hiển thị
    const Top6Sell = async () => {
        try {
            const response = await fetch(`http://localhost:8080/TicketRunning/event/eventTop6Sell`);
            if (!response.ok) {
                throw new Error("Lỗi khi lấy dữ liệu!");
                setLoading(false);
            }
            const data = await response.json();
            setEventTopSell(data.result);
            setLoading(false);
        } catch (error) {
            console.error("Lỗi:", error);
            setLoading(false);

        }
    };

    useEffect(() => {
        Top6Sell();
        fetch(`http://localhost:8080/TicketRunning/event/eventHome`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Lỗi khi lấy dữ liệu!");
                }
                setLoading(false);
                return response.json();
            })
            .then(data => {
                setEvent(data.result);
                setLoading(false);
            })
            .catch(error => console.error("Lỗi:", error));
        setLoading(false);
    }, []);


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
        }
    };


        return(
           <div>
               {loading ? (<Loading/>) : (
                   <div className={"container_home w-100 m-0 p-0"}>
                       <div className={"d-flex justify-content-center"} style={{width: "100%", marginTop: "6%"}}>
                           <img id={"Banner"} src="/src/assets/Banner.png" alt={"banner"}
                                style={{maxWidth: "95%", height: "auto", objectFit: "contain", borderRadius: "20px"}}/>
                       </div>
                       {/*Thanh tìm kiếm*/}
                       <SearchBar/>
                       {/*Các giải chạy random*/}
                       <div className="carousel-intro mt-4">
                           <Swiper
                               modules={[Navigation, Pagination, Autoplay]}
                               spaceBetween={10} // khoảng cách giữa các ảnh
                               slidesPerView={3} //sốluowuong anh
                               navigation
                               pagination={{clickable: true}}
                               autoplay={{delay: 3000, disableOnInteraction: false}}
                               loop={false}
                           >
                               {event && event.slice(0,visibleSlides).map((event, index) => (
                                   <SwiperSlide key={index}>
                                       <Link to={`Event/detailEvent/${event.id}`}>
                                           <img src={event.avatar} alt={event.alt} className="carousel-image"/>
                                       </Link>
                                   </SwiperSlide>
                               ))}
                           </Swiper>
                       </div>
                       <div className={"Carousel.tsx-event"}>
                           <div className={"d-flex ms-4 p-1 my-0"} style={borderRadiusS}>
                               <FaFireAlt style={{color: "red"}} className={"fs-3"}/>
                               <p className={"fw-bold fs-5 m-0"}>Sự Kiện Nổi Bật</p>
                           </div>
                           {/*Các giải chạy có số lượng mua nhiều tối đa 6 giải*/}
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
                                   {eventTopSell && eventTopSell.map((img, index) => (
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
                                                       ) : (<button onClick={() => handleButtonSignUp(img.id)}
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
                       {/*    Các giải chạy*/}
                       <div className={"event"}>
                           <div className={"d-flex"}>
                               <div className={"d-flex ms-4 p-1 my-0"} style={borderRadiusS}>
                                   <MdDirectionsRun style={{color: "red"}} className={"fs-3"}/>
                                   <p className={"fw-bold fs-5 m-0"}>Sự Kiện Chạy Bộ</p>
                               </div>
                               <div className={"fw-bold ms-auto me-5 fs-5"} style={allEvent}>
                                   <Link to={"/Event"} className={"hover_button p-3"} style={{color: "white"}}>
                                       Xem tất cả
                                   </Link>
                               </div>
                           </div>
                           <div className={"event_home"}>
                               {event.slice(0,9).map((event, index) => (
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
               )}
           </div>
        )
};
export default Home;
