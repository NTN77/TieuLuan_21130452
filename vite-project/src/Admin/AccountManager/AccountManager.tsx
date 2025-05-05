import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from "../../Context/AuthContext.tsx";
import ReactPaginate from "react-paginate";
import PopUpEdit from "./PopUpEdit.tsx";

const AccountManager = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const { tokenContext,roleContext } = useContext(AuthContext);

    const usersPerPage = 7;
    const [pageNumber, setPageNumber] = useState(0);
    const [edit,setEdit] = useState(false);
    const [idUserSelect,setIdUserSelect ] = useState("");



        const fetchUser = async () => {
            fetch(`http://localhost:8080/TicketRunning/user/allUser`, {
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
                setUsers(data.result || []);
            })
            .catch(error => console.error("Lỗi:", error));
    };
    useEffect(() => {
        fetchUser();
    },[fetchUser]);
        const actionAccount = async (id,status) => {
        try {
            const response = await fetch(`http://localhost:8080/TicketRunning/admin/updateStatus?idUser=${id}&status=${!status}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${tokenContext}`,
                },
            });

            if (!response.ok) {
                throw new Error('Có lỗi xảy ra khi khóa tài khoản user!');
            }

            const result = await response.json();
            console.log(result);
            if(result.result == true) {
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.id === id ? { ...user, status: !status } : user
                    ));
            }
        } catch (error) {
            console.error(error);
            alert('Lỗi khi cập nhật!');
        }
    };

    // Tìm kiếm và lọc user
    const filteredUsers = users.filter(user =>
        (user.username?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (user.email?.toLowerCase() || '').includes(search.toLowerCase())
    );

    // Tính toán cho phân trang
    const pagesVisited = pageNumber * usersPerPage;
    const pageCount = Math.ceil(filteredUsers.length / usersPerPage);

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };
    const cancelButton = () => {
        setEdit(false);
    }
    const editButton = (idUser) => {
        setEdit(true);
        setIdUserSelect(idUser);
    }

    // Danh sách user hiển thị theo trang
    const displayUsers = filteredUsers
        .slice(pagesVisited, pagesVisited + usersPerPage)
        .map((user, index) => (
            <tr key={user.id}>
                <td>{pagesVisited + index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role?.name || 'N/A'}</td>
                <td>
                    <span className={`badge ${user.status ? 'bg-success' : 'bg-secondary'}`}>
                        {user.status ? 'Hoạt động' : 'Bị khóa'}
                    </span>
                </td>
                {roleContext === "ADMIN" && (user.role?.name === "MANAGER" || user.role?.name === "USER") ? (
                    <td>
                        <button className="btn btn-sm btn-primary me-2" onClick={() => editButton(user.id)}>Chỉnh sửa</button>
                        <button
                            className={`btn btn-sm ${user.status ? 'btn-danger' : 'btn-success'}`}
                            onClick={() => actionAccount(user.id, user.status)}
                        >
                            {user.status ? 'Khóa' : 'Mở khóa'}
                        </button>
                    </td>
                ) : null}

                {roleContext === "MANAGER" && user.role?.name === "USER" ? (
                    <td>
                        <button className="btn btn-sm btn-primary me-2" onClick={() => editButton(user.id)}>Chỉnh sửa
                        </button>
                        <button
                            className={`btn btn-sm ${user.status ? 'btn-danger' : 'btn-success'}`}
                            onClick={() => actionAccount(user.id, user.status)}
                        >
                            {user.status ? 'Khóa' : 'Mở khóa'}
                        </button>
                    </td>
                ) : null}
            </tr>
        ));

    return (
        <div className="container mt-2">
            <h2 className="mb-4">Quản lý tài khoản người dùng</h2>

            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên hoặc email..."
                    className="form-control"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPageNumber(0); // reset trang khi search
                    }}
                />
            </div>

            <table className="table table-bordered table-hover">
                <thead className="table-dark">
                <tr>
                    <th>#</th>
                    <th>Tên</th>
                    <th>Email</th>
                    <th>Vai trò</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {displayUsers.length > 0 ? displayUsers : (
                    <tr>
                        <td colSpan="6" className="text-center">Không tìm thấy người dùng</td>
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
            {edit && <PopUpEdit idUser={idUserSelect} cancel={cancelButton} onSave={fetchUser()}/>}

        </div>
    );
};

export default AccountManager;
