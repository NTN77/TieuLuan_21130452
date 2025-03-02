import {Link} from "react-router-dom";
import {IoTimeOutline} from "react-icons/io5";
import {CiLocationOn} from "react-icons/ci";
import "./Home.css"
const Event = ({event}) => {
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
    return (
       <div style={boxShadow} className={"pb-3"}>
           <Link to={`/${event.id}`}>
               <img src={event.src} alt={event.alt} className="carousel-image"/>
               <p className={"my-2 mx-3 fw-bold fs-6"} style={{color: "Black"}}>{event.name}</p>
               <p className={"mx-3 my-1"} style={{color: "Black"}}><IoTimeOutline
                   style={{color: "red"}}/> {event.time}</p>
               <p className={"mx-3 my-1"} style={{color: "Black"}}><CiLocationOn
                   style={{color: "red"}}/>{event.location}</p>
               <div className={"d-flex mx-3"}>
                   <div>
                       <p className={"m-0 fw-light"} style={{color: "black"}}>Chỉ từ</p>
                       <strong className={"fs-5 text-danger fst-italic"}>{event.price}đ</strong>
                   </div>
                   <div className={"ms-auto"}>
                       <Link to={`/${event.id}`} className="hover_button p-3" style={borderRadiusButton}>Đăng
                           Ký</Link>
                   </div>
               </div>
           </Link>
       </div>
    )
}
export default Event;
