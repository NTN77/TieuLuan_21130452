import {Link, useNavigate} from "react-router-dom";
import {IoTimeOutline} from "react-icons/io5";
import {CiLocationOn} from "react-icons/ci";
import "./Home.css"
import Swal from "sweetalert2";
import React, {useContext} from "react";
import {AuthContext} from "../Context/AuthContext.tsx";
import {Button} from "reactstrap";
const Event = ({event}) => {
    const { tokenContext } = useContext(AuthContext);
    const navigation = useNavigate();
    const borderRadiusButton = {
        borderRadius: "20px",
        width: "fit-content",
        backgroundColor: "blue",
        color:"white"
    }
    const boxShadow = {
        boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.2), -3px -3px 5px rgba(0, 0, 0, 0.2)',
        borderRadius: "10px",
    }
    const handleButtonSignUp = () => {
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
    return (
       <div style={boxShadow} className={"pb-3"}>
           <Link to={`/Event/detailEvent/${event.id}`}>
           <img src={event.avatar} alt={event.alt} className="carousel-image"/>
               <p className={"my-2 mx-3 fw-bold fs-6"} style={{color: "Black", height: "4rem"}}>{event.name}</p>
               <p className={"mx-3 my-1"} style={{color: "Black"}}><IoTimeOutline
                   style={{color: "red"}}/> {event.eventDate}</p>
               <p className={"mx-3 my-1"} style={{color: "Black"}}><CiLocationOn
                   style={{color: "red"}}/>{event.location}</p>
               <div className={"d-flex mx-3"}>
                   {event.minPrice != 0 ? (
                       <div>
                           <p className={"m-0 fw-light"} style={{color: "black"}}>Chỉ từ</p>
                           <strong className={"fs-5 text-danger fst-italic"}>{new Intl.NumberFormat("vi-VN", {
                               style: "currency",
                               currency: "VND"
                           }).format(event.minPrice)}</strong>
                       </div>
                   ) : (
                       <p className={"text-danger d-flex justify-content-center fw-bold fs-5"}>Hết
                           Bán</p>)}

                   {event.minPrice != 0 ? (
                       <div className={"ms-auto d-flex"}>
                           <Button onClick={handleButtonSignUp} className="hover_button p-3" style={borderRadiusButton}>Đăng
                               Ký</Button>
                       </div>
                   ) : (<div className={"ms-auto d-flex"}>
                       <Button onClick={handleButtonSignUp} className="hover_button p-3" disabled={true} style={borderRadiusButton}>Đăng
                           Ký</Button>
                   </div>)}
               </div>
           </Link>
       </div>
    )
}
export default Event;
