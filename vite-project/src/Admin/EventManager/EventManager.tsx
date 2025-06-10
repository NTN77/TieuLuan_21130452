import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../Context/AuthContext.tsx";
import ReactPaginate from "react-paginate";
import PopUpEditEvent from "./PopUpEditEvent.tsx";
import CreateEvent from "./CreateEvent.tsx";

const EventManager =() => {
    const [event,setEvent] = useState([]);
    const [search, setSearch] = useState('');
    const { tokenContext,idContext } = useContext(AuthContext);

    const eventPerPage = 5;
    const [pageNumber, setPageNumber] = useState(0);
    const [edit,setEdit] = useState(false);
    const [idEventSelect,setIdEventSelect ] = useState("");
    const [openCreate,setOpenCreate] = useState(false);
    const [openManagerEvent ,setOpenManagerEvent ] = useState(true);



    const fetchEvent = async () => {
        fetch(`http://localhost:8080/TicketRunning/admin/allEvent`, {
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
                setEvent(data.result || []);
                console.log(data.result)
            })
            .catch(error => console.error("Lỗi:", error));
    };
    useEffect(() => {
            fetchEvent();
        },
        [fetchEvent]);
    const actionAccount = async (id,status) => {
        try {
            const response = await fetch(`http://localhost:8080/TicketRunning/admin/updateStatusEvent?idEvent=${id}&status=${!status}&idAdmin=${idContext}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${tokenContext}`,
                },
            });

            if (!response.ok) {
                throw new Error('Có lỗi xảy ra khi khóa bài viết!');
            }

            const result = await response.json();
            console.log(result);
            if(result.result == true) {
                setEvent(prevUsers =>
                    prevUsers.map(event =>
                        event.id === id ? { ...event, status: !status } : event
                    ));
            }
        } catch (error) {
            console.error(error);
            alert('Lỗi khi cập nhật!');
        }
    };

    // Tìm kiếm và lọc event
    const filteredEvents = event.filter(event =>
        (event.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (event.location?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (event.eventDate?.toLowerCase() || '').includes(search.toLowerCase()),

    );

    // Tính toán cho phân trang
    const pagesVisited = pageNumber * eventPerPage;
    const pageCount = Math.ceil(filteredEvents.length / eventPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const cancelButton = () => {
        setEdit(false);
        setOpenManagerEvent(true);
    }
    const editButton = (idEvent) => {
        setEdit(true);
        setOpenManagerEvent(false);
        setIdEventSelect(idEvent);
    }
    const openCreateEvent = () => {
        setOpenCreate(true);
        setOpenManagerEvent(false);
    }
    const cacelCreateEvent = () => {
        setOpenCreate(false);
        console.log("false");
        setOpenManagerEvent(true);
    }

    // Danh sách event hiển thị theo trang
    const displayEvents = filteredEvents
        .slice(pagesVisited, pagesVisited + eventPerPage)
        .map((event, index) => (
            <tr key={event.id}>
                <td>{pagesVisited + index + 1}</td>
                <td>{event.name}</td>
                <td>{event.eventDate}</td>
                <td>{event.location}</td>
                <td>
                    <span className={`badge ${event.status ? 'bg-success' : 'bg-secondary'}`}>
                        {event.status ? 'Đăng' : 'Bị Khóa'}
                    </span>
                </td>
                    <td className={"d-flex justify-content-center"}>
                        <button className="btn btn-sm btn-primary me-2" onClick={() => editButton(event.id)}>Chỉnh sửa</button>
                        <button
                            className={`btn btn-sm ${event.status ? 'btn-danger' : 'btn-success'}`}
                            onClick={() => actionAccount(event.id, event.status)}
                        >
                            {event.status ? 'Khóa' : 'Đăng'}
                        </button>
                    </td>

            </tr>
        ));

    return (
        <div>
            {openManagerEvent && (<div className="container mt-2">
                <div className={"d-flex justify-content-between"}>
                    <h2 className="mb-4">Quản lý sự kiện</h2>
                    <button className={"bg-info mb-2 "} onClick={openCreateEvent}>Thêm sự kiện</button>
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên, địa điểm diễn ra hoặc ngày diễn ra..."
                        className="form-control"
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
                        <th>Địa điểm</th>
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
            </div>)}
            {openCreate && (<CreateEvent cancelCreateEvent={cacelCreateEvent}/>)}
            {edit && <PopUpEditEvent idEvent={idEventSelect} cancelEditEvent={cancelButton}/>}
        </div>
    );
}
export default EventManager;
