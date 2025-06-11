import {Link, useLocation, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoTicket } from "react-icons/io5";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext.tsx";
import { FaUser } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import "./MenuBar.css";
import Swal from "sweetalert2";
import {MdAdminPanelSettings} from "react-icons/md";
const MenuBar = () => {
    const { usernameContext, logout } = useContext(AuthContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);
    const { tokenContext,roleContext } = useContext(AuthContext);
    const navigation = useNavigate();
    const location = useLocation();

    const getNavLinkClass = (path) => {
        console.log(location.pathname);
        return location.pathname === path ? "buttonActive nav-link " : "nav-link";
    };

    const handleButtonMyTicket = () => {
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
        } else {
            navigation(`/myticket`);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container">
                <Link className="navbar-brand d-flex align-items-center" to="/">
                    <img src="/iconMain.png" alt="Logo" width="55rem" className="me-2" />
                    <span style={{color: "#455d67"}}>NTNRunning</span>
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className={getNavLinkClass("/Event")} to="/Event">
                                Giải Chạy
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={getNavLinkClass("/News")} to="/News">
                                Tin Tức
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={getNavLinkClass("/support")} to="/support">
                                Hỗ Trợ
                            </Link>
                        </li>
                        <li className="nav-item d-flex align-items-center">
                            <IoTicket className="text-primary me-1" />
                            <button className={getNavLinkClass("/myTicket")} onClick={handleButtonMyTicket}>
                                Vé của tôi
                            </button>
                        </li>
                        <li className="nav-item mt-2 ms-5">
                            {usernameContext ? (
                                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                    <DropdownToggle
                                        tag="div"
                                        data-toggle="dropdown"
                                        aria-expanded={dropdownOpen}
                                        className="btn btn-sm btn-outline-primary d-flex align-items-center"
                                    >
                                        <FaUser className="me-2" />
                                        <span>{usernameContext}</span>
                                    </DropdownToggle>
                                    <DropdownMenu style={{marginTop: "30px"}}>
                                        <DropdownItem className={"drop_item text-decoration-none text-dark"} onClick={logout}>
                                            <CiLogout className="me-2" /> Đăng xuất
                                        </DropdownItem>
                                        <DropdownItem className={"drop_item"}>
                                            <button onClick={handleButtonMyTicket} className="drop_myticket text-decoration-none text-dark">
                                                <IoTicket className="iconTicket text-primary me-1" /> Vé của tôi
                                            </button>
                                        </DropdownItem>
                                        {roleContext === "ADMIN" || roleContext === "MANAGER" ? (
                                            <DropdownItem className={"drop_item"}>
                                                <Link to={"/Admin"} className="drop_myticket text-decoration-none text-dark">
                                                    <MdAdminPanelSettings className="iconTicket text-primary me-1"/> Trang quản lý
                                                </Link>
                                            </DropdownItem>
                                        ) : null}
                                    </DropdownMenu>
                                </Dropdown>
                            ) : (
                                <Link className="btn btn-primary btn-sm " to="/Login">
                                    Đăng Nhập
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default MenuBar;
