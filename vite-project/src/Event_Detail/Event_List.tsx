import SearchBar from "../MenuBar_Footer/SearchBar.tsx";
import { MdDirectionsRun } from "react-icons/md";
import Event from "../Home/Event.tsx";
import {useEffect, useState} from "react";
import {CiFilter} from "react-icons/ci";
import {FaAngleDown} from "react-icons/fa";
import "./Event_List.css"
import FilterSidebar from "./FilterSidebar.tsx";

const Event_List = () => {
    const eventsPerPage = 9; // Số sự kiện
    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [events,setEvents] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8080/TicketRunning/event/eventAll`)
            .then(response => {
                console.log("Response status:", response.status);
                if (!response.ok) {
                    throw new Error("Lỗi khi lấy dữ liệu!");
                }
                return response.json();
            })
            .then(data => {
                setEvents(data.result);
            })
            .catch(error => console.error("Lỗi:", error));
    }, [event]);

    // Tính toán tổng số trang
    const totalPages = Math.ceil(events.length / eventsPerPage);

    // Chia danh sách sự kiện theo trang hiện tại
    const currentEvents = events.slice((currentPage - 1) * eventsPerPage, currentPage * eventsPerPage);

    // Hàm xử lý chuyển trang
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div style={{ width: "100%", marginTop: "6%" }}>
            <div className={"my-3"}>
                <SearchBar />
            </div>
            <div className={"event"}>
                <div className={"d-flex"}>
                    <div className={"d-flex ms-4 p-1 my-0"} style={{ border: "1px solid red", borderRadius: "50px", width: "fit-content" }}>
                        <MdDirectionsRun style={{ color: "red" }} className={"fs-3"} />
                        <p className={"fw-bold fs-5 m-0"}>Sự Kiện Chạy Bộ</p>
                    </div>
                    <div className={"container_filter ms-auto me-5 fs-5"}>
                       <div className={"filter_all"}  onClick={() => setIsFilterOpen(true)}>
                           <CiFilter />
                           <span>Bộ Lọc</span>
                           <FaAngleDown />
                       </div>
                    </div>
                </div>

                {/* Danh sách sự kiện 3x3 */}
                <div className="event_home d-grid gap-3" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
                    {currentEvents.map((event) => (
                        <Event key={event.id} event={event} />
                    ))}
                </div>

                {/* Phân trang */}
                <div className="pagination d-flex justify-content-center my-4">
                    {Array.from({ length: totalPages }, (_, index) => (
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
            {isFilterOpen && <div className="overlay" onClick={() => setIsFilterOpen(false)}></div>}
            <FilterSidebar isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
        </div>
    );
};

export default Event_List;
