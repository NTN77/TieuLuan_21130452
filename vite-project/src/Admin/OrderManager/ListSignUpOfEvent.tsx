import ReactPaginate from "react-paginate";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../Context/AuthContext.tsx";
import {IoMdArrowRoundBack} from "react-icons/io";
import PopUpCustomerDetail from "./PopUpCustomerDetail.tsx";
import PopUpConfirm from "./PopUpConfirm.tsx";

const ListSignUpOfEvent = ({eventSelect,cancel}) => {
    const [customers,setCustomers] = useState([]);
    const [search, setSearch] = useState('');
    const { tokenContext } = useContext(AuthContext);

    const eventPerPage = 5;
    const [pageNumber, setPageNumber] = useState(0);
    const [customerSelect,setCustomerSelect] = useState("");
    const [openPopUp,setOpenPopUp] = useState(false);
    const [confirmButton,setConfirmButton] = useState(false);


    //Sắp xếp sự kiện
    const sortCustomer = (customer) => {
        return customer.sort((a, b) => {
            const aBib = (a.bib == null) ? 0 : 1;
            const bBib = (b.bib == null) ? 0 : 1;
            if (aBib !== bBib) {
                return aBib - bBib;
            }
            // sắp xêếp ngày
            const dateA = new Date(a.createAt);
            const dateB = new Date(b.createAt);

            return dateA - dateB;
        });
    };

    const fetchEvent = async () => {
        fetch(`http://localhost:8080/TicketRunning/admin/allCustomerOfEvent?eventId=${eventSelect.id}`, {
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
                setCustomers(sortCustomer(data.result) || []);
            })
            .catch(error => console.error("Lỗi:", error));
    };
    useEffect(() => {
            fetchEvent();
        },
        [fetchEvent]);

    // Tìm kiếm và lọc event
    const filteredCustomers = customers.filter(customer =>
        (customer.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (customer.eventDistance?.toLowerCase() || '').includes(search.toLowerCase()),

    );

    // Tính toán cho phân trang
    const pagesVisited = pageNumber * eventPerPage;
    const pageCount = Math.ceil(filteredCustomers.length / eventPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const formatCurrency = (value) => {
        if (!value) return "";
        return Number(value.toString().replace(/\D/g, "")).toLocaleString("vi-VN");
    };

    //Xem chi tiết
    const customerDetail = (customerInfor) => {
        setCustomerSelect(customerInfor);
        setOpenPopUp(true);
    }
    const cacelPopUp = () => {
        setCustomerSelect("");
        setOpenPopUp(false);
    }
    const PopupConfirm = (customerInfor) =>{
        setCustomerSelect(customerInfor);
        setConfirmButton(true);
    }
    const cacelConfirm = () => {
        setCustomerSelect("");

        setConfirmButton(false);
    }


    // Danh sách event hiển thị theo trang
    const displayCustomer = filteredCustomers
        .slice(pagesVisited, pagesVisited + eventPerPage)
        .map((customer, index) => (
            <tr key={customer.id}>
                <td>{pagesVisited + index + 1}</td>
                <td>{customer.userName}</td>
                <td>{customer.eventDistance}</td>
                <td>{formatCurrency(customer.eventPrice)} VND</td>
                <td>{(customer.bib == null) ? "------" : customer.bib}</td>
                <td>
                    <span className={`badge ${(customer.bib != null) ? 'bg-success' : 'bg-secondary'}`}>
                        {(customer.bib != null) ? 'Đã xác thực' : 'Chưa xác thực'}
                    </span>
                </td>
                <td className={"d-flex justify-content-center"}>
                    <button className="btn btnHover btn-sm btn-primary me-2">Chỉnh sửa
                    </button>
                    <button className="btn btnHover btn-sm btn-success me-2" onClick={() => PopupConfirm(customer)}>Xác thực
                    </button>
                    <button className="btn btnHover btn-sm btn-primary me-2" onClick={() => customerDetail(customer)}>Thông tin chi tiết
                    </button>
                    {/*Đủ thời gian mở rộng*/}
                    {/*<button className="btn btnHover btn-sm btn-primary me-2">Hủy Đăng Ký*/}
                    {/*</button>*/}
                </td>

            </tr>
        ));

    return (
        <div>
            <div className="container mt-2">
                <div className={"d-flex"}>
                    <IoMdArrowRoundBack style={{fontSize: "40px"}} className={"cursor-pointer"} onClick={cancel}/>
                    <h2 className="mb-2 px-5 text-success mx-auto"> {eventSelect.name}</h2>
                </div>
                <div className="mb-3">
                    <div>

                    </div>
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên  ..."
                        className="form-control me-3"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPageNumber(0);
                        }}
                    />
                    <div className={"mt-2"}>
                        <button className="btn btnHover btn-sm btn-success me-2">Xuất danh sách ra Excel <p className={"mb-0 fst-italic"}>(đã xác thực)</p>
                        </button>
                    </div>

                </div>


                <table className="table table-bordered table-hover">
                <thead className="table-dark">
                    <tr>
                        <th>#</th>
                        <th>Họ và tên</th>
                        <th>Cự ly</th>
                        <th>Giá thanh toán</th>
                        <th>Số bib</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {displayCustomer.length > 0 ? displayCustomer : (
                        <tr>
                            <td colSpan="6" className="text-center">Không có người đăng ký sự kiện</td>
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
            {openPopUp && (<PopUpCustomerDetail customer={customerSelect} cancel={cacelPopUp}/>)}
            {confirmButton && (<PopUpConfirm customer={customerSelect} cancelConfirm={cacelConfirm}/>)}
        </div>
    )
}
export default ListSignUpOfEvent;
