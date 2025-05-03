import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../Context/AuthContext.tsx";
import ReactPaginate from "react-paginate";
import "./OrderManager.css"
import ListSignUpOfEvent from "./ListSignUpOfEvent.tsx";
const OrderManager =() => {
    const [event,setEvent] = useState([]);
    const [search, setSearch] = useState('');
    const { tokenContext } = useContext(AuthContext);

    const eventPerPage = 5;
    const [pageNumber, setPageNumber] = useState(0);
    const [buttonList,setButtonList] = useState(false);
    const [eventSelect,setEventSelect] = useState("");
    //Sắp xếp sự kiện
    const sortEvents = (events) => {
        return events.sort((a, b) => {
            //sắp xếp theo trạng thái còn bán hay không
            const aHasPrice = a.minPrice > 0 ? 0 : 1;
            const bHasPrice = b.minPrice > 0 ? 0 : 1;
            if (aHasPrice !== bHasPrice) {
                return aHasPrice - bHasPrice;
            }
            if(a.confirmNumber !== b.confirmNumber) {
                return b.confirmNumber - a.confirmNumber;
            }
            // sắp xêếp ngày
            const dateA = new Date(a.eventDate);
            const dateB = new Date(b.eventDate);

            return dateA - dateB; // Ngày sớm hơn đứng trước
        });
    };

    const fetchEvent = async () => {
        fetch(`http://localhost:8080/TicketRunning/admin/orderManagerEvent`, {
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
                setEvent(sortEvents(data.result) || []);
            })
            .catch(error => console.error("Lỗi:", error));
    };
    useEffect(() => {
            fetchEvent();
        },
        [fetchEvent]);

    // Tìm kiếm và lọc event
    const filteredEvents = event.filter(event =>
        (event.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (event.eventDate?.toLowerCase() || '').includes(search.toLowerCase()),

    );

    // Tính toán cho phân trang
    const pagesVisited = pageNumber * eventPerPage;
    const pageCount = Math.ceil(filteredEvents.length / eventPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const buttonLists = (event) => {
        setButtonList(true);
        setEventSelect(event);
    }

    // Danh sách event hiển thị theo trang
    const displayEvents = filteredEvents
        .slice(pagesVisited, pagesVisited + eventPerPage)
        .map((event, index) => (
            <tr key={event.id}>
                <td>{pagesVisited + index + 1}</td>
                <td>{event.name}</td>
                <td>{event.eventDate}</td>
                {/*Số lượng mua*/}
                <td>{event.totalSignIn}</td>
                <td>
                    <span className={`badge ${event.minPrice > 0 ? 'bg-success' : 'bg-secondary'}`}>
                        {event.minPrice > 0 ? 'Còn Đăng Ký' : 'Hết Đăng Ký'}
                    </span>
                </td>
                <td className={"d-flex justify-content-center"}>
                    <div>
                        <button className="btn btnHover btn-sm btn-primary me-2"
                                onClick={() => buttonLists(event)}>Danh sách đăng ký
                        </button>
                        <label className={"informNumber px-2"}>{event.confirmNumber}</label>
                    </div>
                </td>

            </tr>
        ));
    const cancelList = () => {
        setEventSelect("");
        setButtonList(false);
    }
    return (
        <div>
            {!buttonList ? (
                <div className="container mt-2">
                    <div className="d-flex justify-content-between">
                        <h2 className="mb-4">Quản lý đơn hàng</h2>
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên sự kiện,ngày diễn ra ..."
                            className="form-control me-3"
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPageNumber(0);
                            }}
                        />
                    </div>

                    <table className="table table-bordered table-hover">
                        <thead className="table-dark">
                        <tr>
                            <th>#</th>
                            <th>Tên sự kiện</th>
                            <th>Ngày diễn ra</th>
                            <th>Tổng số lượng đăng ký</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {displayEvents.length > 0 ? displayEvents : (
                            <tr>
                                <td colSpan="6" className="text-center">Không tìm thấy sự kiện</td>
                            </tr>
                        )}
                        </tbody>
                    </table>

                    {pageCount > 1 && (
                        <ReactPaginate
                            previousLabel={"Trước"}
                            nextLabel={"Tiếp"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={"pagination justify-content-center"}
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            activeClassName={"active"}
                        />
                    )}
                </div>
            ) : (<ListSignUpOfEvent eventSelect={eventSelect} cancel={cancelList}/>)}
        </div>
    );
}
export default OrderManager;
