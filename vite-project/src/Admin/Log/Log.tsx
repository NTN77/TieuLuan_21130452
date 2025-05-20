import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../Context/AuthContext.tsx";
import ReactPaginate from "react-paginate";

const Log =() => {
    const [logs,setLogs] = useState([]);
    const [search, setSearch] = useState('');
    const { tokenContext } = useContext(AuthContext);
    const eventPerPage = 5;
    const [pageNumber, setPageNumber] = useState(0);


    const sortLogs = (logs) => {
        return logs.sort((a, b) => {

            // sắp xêếp ngày
            const dateA = new Date(a.createAt);
            const dateB = new Date(b.createAt);

            return dateB - dateA;
        });
    };
    const fetchEvent = async () => {
        fetch(`http://localhost:8080/TicketRunning/admin/Log`, {
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
                setLogs(sortLogs(data.result) || []);
                console.log(data.result)
            })
            .catch(error => console.error("Lỗi:", error));
    };
    useEffect(() => {
            fetchEvent();
        },
        []);

    // Tìm kiếm và lọc event
    const filteredLog = logs.filter(log =>
        (log.action?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (log.createAt?.toLowerCase() || '').includes(search.toLowerCase())
    );

    // Tính toán cho phân trang
    const pagesVisited = pageNumber * eventPerPage;
    const pageCount = Math.ceil(filteredLog.length / eventPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };


    // Danh sách event hiển thị theo trang
    const displayLog = filteredLog
        .slice(pagesVisited, pagesVisited + eventPerPage)
        .map((log, index) => (
            <tr key={log.id}>
                <td>{pagesVisited + index + 1}</td>
                <td>{log.action}</td>
                <td>{log.detail}</td>
                <td><p className={"m-0"}>{new Date(log.createAt).toLocaleDateString("en-GB")}</p>
                    <p className={"m-0"}>{new Date(log.createAt).toLocaleTimeString("en-GB")}</p></td>
                <td>{log.idUser.username}</td>



            </tr>
        ));

    return (
        <div>
             <div className="container mt-2">
                <div className={"d-flex justify-content-between"}>
                    <h2 className="mb-4">Lịch Sử Quản Lý</h2>
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
                        <th>Hành Động</th>
                        <th>Chi Tiết</th>
                        <th>Thời Gian</th>
                        <th>Người Thực Hiện</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayLog.length > 0 ? displayLog : (
                        <tr>
                            <td colSpan="6" className="text-center">Không tìm thấy lịch sử quản lý</td>
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
        </div>
    );
}
export default Log;
