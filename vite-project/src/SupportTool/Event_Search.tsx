import SearchBar from "../MenuBar_Footer/SearchBar.tsx";
import Event from "../Home/Event.tsx";
import React, {useState} from "react";
import "../EventList/Event_List.css"
import {useLocation} from "react-router-dom";
import {FaFaceSadTear} from "react-icons/fa6";
import {FaFireAlt} from "react-icons/fa";

const Event_Search = () => {
    const eventsPerPage = 9; // Số sự kiện
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const location = useLocation();
    const searchResults = location.state?.searchResults || []; // Lấy dữ liệu từ state
    // Tính toán tổng số trang
    const totalPages = Math.ceil(searchResults.length / eventsPerPage);
    // Chia danh sách sự kiện theo trang hiện tại
    const currentEvents = searchResults.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage);
    // Hàm xử lý chuyển trang
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const borderRadiusS = {
        border: "1px solid red",
        borderRadius: "50px",
        width: "fit-content",

    }

    return (
        <div style={{ width: "100%", marginTop: "6%" }}>
            <div className={"my-3"}>
                <SearchBar/>
            </div>
            <div className={"event"}>
                <div className={"d-flex ms-4 p-1 my-0"} style={borderRadiusS}>
                    <FaFireAlt style={{color: "red"}} className={"fs-3"}/>
                    <p className={"fw-bold fs-5 m-0"}>Kết Quả Tìm Kiếm</p>
                </div>
                {/* Danh sách sự kiện 3x3 */}
                {searchResults.length > 0 ? (
                    <div className="event_home d-grid gap-3" style={{gridTemplateColumns: "repeat(3, 1fr)"}}>
                        {currentEvents.map((event) => (
                            <Event key={event.id} event={event}/>
                        ))}
                    </div>
                ) : (<div className={"d-flex justify-content-center mt-3"}>
                    <div>
                        <FaFaceSadTear className={"fs-1 d-flex mx-auto"}/>
                        <h3>Hazz,rất tiếc không tìm thấy sự kiện nào rồi!</h3>
                        <p className={"d-flex justify-content-center"}>Hãy tìm thông tin khác nhé!</p>
                    </div>
                </div>)}

                {/* Phân trang */}
                <div className="pagination d-flex justify-content-center my-4">
                    {Array.from({length: totalPages}, (_, index) => (
                        <button
                            key={index}
                            className={`btn mx-1 ${currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Event_Search;
