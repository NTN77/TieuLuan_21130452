import React, {useContext, useEffect, useState} from "react";
import { FaPhoneAlt, FaRegUserCircle, FaRunning, FaUser } from "react-icons/fa";
import { CiEdit} from "react-icons/ci";
import { IoTicketSharp } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";
import ReactPaginate from "react-paginate";
import "./MyTicket.css";
import {AuthContext} from "../Context/AuthContext.tsx";
import {Link} from "react-router-dom";
import {MdEmail} from "react-icons/md";
import {IoMdArrowRoundBack} from "react-icons/io";
import PopupEditInfor from "./PopupEditInfor.tsx";

const MyTicket = () => {
    const [pageNumber, setPageNumber] = useState(0);
    const runnersPerPage = 5;
    const pagesVisited = pageNumber * runnersPerPage;
    const { tokenContext,usernameContext,idContext,logout } = useContext(AuthContext);
    const [eventsSignIn,setEventsSignIn] = useState([]);
    const [selectEvent,setSelectEvent] = useState();
    const [openPopUp,setOpenPopUp] = useState(false);
    const [editInfo,setEditInfo] = useState(false);
    const [myTicket,setMyTicket] = useState(true);

    useEffect(() => {
        console.log(idContext)
        if (!idContext) return;
        fetch(`http://localhost:8080/TicketRunning/information/listEventSignIn?idUser=${idContext}`,{
            headers: {
                "Authorization": `Bearer ${tokenContext}`
            },
        })

            .then(response => {
                if (!response.ok) {
                    throw new Error("Lỗi khi lấy dữ liệu!");
                }
                return response.json();
            })
            .then(data => {
                setEventsSignIn(data.result);
                // console.log("Data:" ,data.result)
            })
            .catch(error => console.error("Lỗi:", error));
    }, [idContext, tokenContext]);

    const onClickEvent = (event) => {
        setSelectEvent(event);
        setOpenPopUp(true);
    }
    const cancelPopUp = () => {
        setSelectEvent(undefined);
        setOpenPopUp(false);
        setEditInfo(false);
    }
    const editInfor = () => {
        setEditInfo(true);
        setSelectEvent(undefined);
        setOpenPopUp(false);
        setMyTicket(false);
    }
    const callbackMyTicket = () => {
        setEditInfo(false);
        setSelectEvent(undefined);
        setOpenPopUp(false);
        setMyTicket(true);
        console.log("Zo")
    }

    const displayEvents = eventsSignIn
        .slice(pagesVisited, pagesVisited + runnersPerPage)
        .map((event, index) => (
            <tr key={event.id} onClick={() => onClickEvent(event)} className={"cursor-pointer"}>
                <td>{index + 1}</td>
                <td className="mt-5">
                    <div className={"d-flex align-items-center "}>
                        <div
                            className="bg-warning text-white rounded-circle d-flex align-items-center justify-content-center me-2"
                            style={{ width: 30, height: 30 }}>
                            <FaUser size={14} />
                        </div>
                        <span>{event.userName}</span>
                    </div>
                </td>
                <td>
                    <div className="mb-1 d-flex">
                        <FaRunning className="me-2"/>
                        {event.eventDistance}
                    </div>
                    <div className="mb-1 d-flex">
                        <FaPhoneAlt className="me-2"/>
                        {event.phoneNumber}
                    </div>
                    <div className="mb-1 d-flex">
                        <MdEmail className="me-2 mt-1"/>
                        {event.email}
                    </div>
                </td>
                <td style={{whiteSpace: 'pre-line'}}>{event.eventName}</td>
            </tr>
        ));
    const pageCount = Math.ceil(eventsSignIn.length / runnersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };


    return (
        <div className={"container_ticket d-flex"} style={{ marginTop: "80px" }}>
            <div className={"left_infor"}>
                <div className={"mx-5 mt-5"}>
                    <FaRegUserCircle className={" text-info"} style={{ fontSize: "100px" }} />
                    <p className={"fw-bold fst-italic d-flex justify-content-center"}>{usernameContext}</p>
                </div>
                <button className={"mx-auto d-flex"} onClick={editInfor}><CiEdit className={"mt-1"} /> Chỉnh sửa</button>
                <Link to={"/myticket"} onClick={callbackMyTicket}  className= {`${myTicket ? "Bmyticket" : "NoSelect ps-3"} cursor-pointer d-flex mt-3 mx-auto fw-bold`}>
                    <IoTicketSharp />
                    <p className={"ms-2 m-0 "}>Vé của tôi</p>
                </Link>
                <Link to={"/Login"} className={"signOut d-flex cursor-pointer mt-2 mx-auto"} onClick={logout}>
                    <GoSignOut />
                    <p className={"m-0"}>Đăng xuất</p>
                </Link>
            </div>
        {/*    PopUp*/}
            {!openPopUp ?(
                <div className={"right_ticket"}>
                    {!editInfo ? (
                        <div><h3 className={"d-flex justify-content-center mt-3 text-success"} >Vé Của Tôi</h3>
                            <div className="bg-white rounded p-4 shadow-sm">
                                <table className="table align-middle">
                                    <thead>
                                    <tr>
                                        <th scope="col">STT</th>
                                        <th scope="col">Họ tên</th>
                                        <th scope="col">Thông tin</th>
                                        <th scope="col">Sự kiện</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {displayEvents}
                                    </tbody>
                                </table>
                                {eventsSignIn.length > 0 ? (
                                    <ReactPaginate
                                        previousLabel={"Trước"}
                                        nextLabel={"Tiếp"}
                                        pageCount={pageCount}
                                        onPageChange={changePage}
                                        containerClassName={"pagination justify-content-center"}
                                        previousClassName={"pageLiR"}
                                        nextClassName={"pageLiL"}
                                        activeClassName={"active"}
                                    />
                                ) : (<p className={"d-flex justify-content-center"}>Chưa đăng ký sự kiện nào!</p>)}
                            </div>
                        </div>
                    ) : (<PopupEditInfor/>)}
                </div>
            ) : (
                <div className="popup mx-5 my-3">
                    <div className={"d-flex"}>
                        <button style={{maxHeight: "50px"}} onClick={cancelPopUp}><IoMdArrowRoundBack
                            className={"fs-3"}/></button>
                        <h2 className={"d-flex mt-3 text-info mx-3"}>{selectEvent.eventName}</h2>
                    </div>
                    <div className={"ms-5"}>
                        <h3>Thông tin chi tiết</h3>
                        <div className={"d-flex"}>
                            <div style={{flex: "1"}}>
                                <label>Họ và tên:</label>
                                <p>{selectEvent.userName}</p>
                            </div>
                            <div style={{flex: "1"}}>
                                <label>Số điện thoại:</label>
                                <p>{selectEvent.phoneNumber}</p>
                            </div>
                        </div>
                        <div className={"d-flex"}>
                            <div style={{flex: "1"}}>
                                <label>Địa chỉ email:</label>
                                <p>{selectEvent.email}</p>
                            </div>
                            <div style={{flex: "1"}}>
                                <label>Giới tính:</label>
                                {selectEvent.gender ? (<p>Nam</p>) : (
                                    <p>Nữ</p>)}
                            </div>
                        </div>
                        <div className={"d-flex"}>
                            <div style={{flex: "1"}}>
                                <label>CMND/CCCD:</label>
                                <p>{selectEvent.identityCard}</p>
                            </div>
                            <div style={{flex: "1"}}>
                                <label>Quốc tịch:</label>
                                <p>{selectEvent.nationality}</p>
                            </div>
                        </div>
                        <div className={"d-flex"}>
                            <div style={{flex: "1"}}>
                                <label>Quốc gia:</label>
                                <p>{selectEvent.country}</p>
                            </div>
                            <div style={{flex: "1"}}>
                                <label>Tỉnh/Thành Phố đang sinh sống:</label>
                                <p>{selectEvent.province}</p>
                            </div>
                        </div>
                        <div className={"d-flex"}>
                            <div style={{flex: "1"}}>
                                <label>Ngày Sinh:</label>
                                <p>{selectEvent.birthDate}</p>
                            </div>
                            <div style={{flex: "1"}}>
                                <label>Quốc tịch:</label>
                                <p>{selectEvent.nationality}</p>
                            </div>
                        </div>
                    </div>
                    <div className={"ms-5"}>
                        <h3>Thông tin bổ sung</h3>
                        <div className={"d-flex"}>
                            <div style={{flex: "1"}}>
                                <label>Cỡ áo:</label>
                                <p>{selectEvent.sizeChart}</p>
                            </div>
                            <div style={{flex: "1"}}>
                                <label>Tên người liên lạc khẩn cấp:</label>
                                <p>{selectEvent.userNameKC}</p>
                            </div>
                        </div>
                        <div className={"d-flex"}>
                            <div style={{flex: "1"}}>
                                <label>Số điện thoại người liên lạc khẩn cấp:</label>
                                <p>{selectEvent.phoneNumberKC}</p>
                            </div>
                        </div>
                    </div>
                    <div className={"ms-5"}>
                        <h3>Thông tin y tế</h3>
                        <div className={"d-flex"}>
                            <div style={{flex: "1"}}>
                                <label>Nhóm máu:</label>
                                <p>{selectEvent.bloodGroup}</p>
                            </div>
                            <div style={{flex: "1"}}>
                                <label>Thông tin y tế:</label>
                                <p>{selectEvent.healthCare}</p>
                            </div>
                        </div>
                        <div className={"d-flex"}>
                            <div style={{flex: "1"}}>
                                <label>Loại thuốc đang dùng:</label>
                                <p>{selectEvent.healthCare}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyTicket;
