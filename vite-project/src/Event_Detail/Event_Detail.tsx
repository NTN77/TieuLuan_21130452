import {CiCalendarDate, CiLocationOn} from "react-icons/ci";
import "./Event_Detail.css"
import React, {useContext, useEffect, useState} from "react";
import Carousel from "./Carousel.tsx";
import { useNavigate, useParams} from "react-router-dom";
import {AuthContext} from "../Context/AuthContext.tsx";
import Swal from "sweetalert2";
import {Button} from "reactstrap";
const Event_Detail = () => {
    const { id} = useParams();
    const [event,setEvent] = useState();
    const { tokenContext } = useContext(AuthContext);
    const navigation = useNavigate();

    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:8080/TicketRunning/event/eventDetail?id=${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Lỗi khi lấy dữ liệu!");
                }
                return response.json();
            })
            .then(data => {
                setEvent(data.result);
                console.log("Dữ liệu nhận được:", data);
            })
            .catch(error => console.error("Lỗi:", error));

    }, [id]);
    const handleButtonSignUp = () => {
        if(tokenContext == null || tokenContext == ""){
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
        }else{
            navigation(`/Event/payment/${event.id}`);
        }
    }
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return(
        <div className={"container_eventDetail"} style={{marginTop: "80px"}}>
        {event ? (
               <div>
                    <div className={"header_eventDetail w-75 mx-auto"}>
                        <div className={"avatarEvent  mx-auto"}>
                            <img src={event?.avatar} style={{width: "-webkit-fill-available", borderRadius: "20px"}}/>
                        </div>
                        <div className={"inforHeader d-flex"}>
                            <div className={"inforEventDetail"}>
                                <h3 className={"nameEvent"}>{event.name}</h3>
                                <div className={"solid"}></div>
                                <p className={"dateEvent mt-2 "} style={{color: "blue"}}><CiCalendarDate
                                    style={{color: "red"}}/> {event.eventDate}</p>
                                <p className={"location"} style={{color: "blue"}}><CiLocationOn
                                    style={{color: "red"}}/> {event.location}</p>
                            </div>
                            <div className={"sellTicket ms-auto"}>
                                <div className={"borderTopBlue"}>
                                    <div className={"containerSellTicket px-5"}>
                                        {event.minPrice != 0 ? (
                                            <p>Chỉ từ <strong
                                                className={"minPrice fs-5 text-danger"}>{new Intl.NumberFormat("vi-VN", {
                                                style: "currency",
                                                currency: "VND"
                                            }).format(event.minPrice)}</strong></p>
                                        ):(<p className={"text-danger d-flex justify-content-center fw-bold fs-5"}>Hết Bán</p>)}
                                        {event.minPrice != 0 ? (
                                            <Button onClick={handleButtonSignUp}
                                                    className="sellTicketButton d-flex justify-content-center m-auto mb-3 hover_button p-3">Đăng
                                                Ký</Button>
                                        ):(<Button  disabled={true}
                                                   className="sellTicketButton d-flex justify-content-center m-auto mb-3 hover_button p-3">Đăng
                                            Ký</Button>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"contentEvent d-flex w-75 mx-auto"}>
                        <div className={"inforEvent"}
                        >
                            <div style={{
                                maxHeight: isExpanded ? "none" : "300px", // Giới hạn chiều cao khi chưa mở rộng
                                overflow: "hidden",
                                transition: "max-height 0.5s ease",
                            }}>
                                <div className={"infor"}>
                                    <h4>THÔNG TIN SỰ KIỆN</h4>
                                    <p className={"mx-4 fst-italic"}>{event.description}</p>
                                </div>
                                <div className={"price"}>
                                    <h4>BẢNG GIÁ VÉ</h4>
                                    {event.price != null ? (
                                        <div>
                                            <img src={event.price} className={"w-100"}/>
                                        </div>
                                    ) : (
                                        <div className={"mx-4"}><p>Chưa được cập nhật!</p></div>
                                    )}

                                </div>
                                {/*police*/}
                                <div className={"police"}>
                                    <h4>CHÍNH SÁCH CỦA SỰ KIỆN</h4>
                                    {event.policys != null ? (
                                        <div>
                                            <img src={event.policys} className={"w-100"}/>
                                        </div>
                                    ) : (
                                        <div className={"mx-4"}><p>Chưa được cập nhật!</p></div>
                                    )}

                                </div>
                                {/*schedule*/}
                                <div className={"police"}>
                                    <h4>LỊCH TRÌNH SỰ KIỆN</h4>
                                    {event.schedule != null ? (
                                        <div>
                                            <img src={event.schedule} className={"w-100"}/>
                                        </div>
                                    ) : (
                                        <div className={"mx-4"}><p>Chưa được cập nhật!</p></div>
                                    )}

                                </div>
                                {/*raceKit*/}
                                <div className={"police"}>
                                    <h4>RACEKIT</h4>
                                    {event.raceKit != null ? (
                                        <div>
                                            <img src={event.raceKit} className={"w-100"}/>
                                        </div>
                                    ) : (
                                        <div className={"mx-4"}><p>Chưa được cập nhật!</p></div>
                                    )}

                                </div>
                                {/*award*/}
                                <div className={"police"}>
                                    <h4>GIẢI THƯỞNG</h4>
                                    {event.award != null ? (
                                        <div>
                                            <img src={event.award} className={"w-100"}/>
                                        </div>
                                    ) : (
                                        <div className={"mx-4"}><p>Chưa được cập nhật!</p></div>
                                    )}

                                </div>
                            </div>
                            {/* Nút xem thêm / thu gọn */}
                            <button className={"mx-auto d-flex my-3"} onClick={toggleExpand}
                                    style={{cursor: "pointer", background: "blue", color: "white"}}>
                                {isExpanded ? "Thu gọn" : "Xem thêm"}
                            </button>
                        </div>
                        <div className={"summarize"}>
                            <div className={"summarize_avatar"}>
                                <img src={event.avatar} className={"w-100"}/>
                            </div>
                            <div className={"summarize_infor mx-3"}>
                                <h5 className={"summarize_nameEvent"}>{event.name}</h5>
                                <p className={"summarize_dateEvent mt-2 "}><CiCalendarDate
                                    style={{color: "red"}}/> {event.eventDate}</p>
                                <p className={"summarize_location"}><CiLocationOn
                                    style={{color: "red"}}/> {event.location}</p>
                                <div className={"solid"}></div>
                                <div className={"summarize_containerSellTicket px-5 mt-3"}>
                                    {event.minPrice != 0 ? (
                                        <p className={"summarize_minPrice "}>Chỉ từ <strong
                                            className={"fs-5 text-danger"}>{new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND"
                                        }).format(event.minPrice)}</strong></p>
                                    ) : (<p className={"text-danger d-flex justify-content-center fw-bold fs-5"}>Hết
                                        Bán</p>)}
                                    {event.minPrice != 0 ? (
                                        <Button onClick={handleButtonSignUp} className="summarize_sellTicketButton d-flex justify-content-center p-3  m-auto mb-3" >Đăng
                                            Ký</Button>
                                    ):( <Button onClick={handleButtonSignUp} disabled={true} className="summarize_sellTicketButton d-flex justify-content-center p-3  m-auto mb-3" >Đăng
                                        Ký</Button>)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Carousel/>
                </div>
            ) : (
                <div>
                    <p>Đang tải dữ liệu sự kiện...</p>
                </div>
            )
        }
        </div>
    )
}
export default Event_Detail;
