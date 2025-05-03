import {Link, useNavigate} from "react-router-dom";
import { MdDashboard, MdOutlineEventNote} from "react-icons/md";
import {RiAccountBox2Line} from "react-icons/ri";
import {CiLogout, CiShop} from "react-icons/ci";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {FaHome, FaUser} from "react-icons/fa";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../Context/AuthContext.tsx";
import Dashboard from "./Dashboard.tsx";
import "./Admin.css"
import AccountManager from "./AccountManager/AccountManager.tsx";
import EventManager from "./EventManager/EventManager.tsx";
import OrderManager from "./OrderManager/OrderManager.tsx";

const Admin = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { usernameContext, logout ,roleContext,tokenContext } = useContext(AuthContext);
    const navigator = useNavigate();
    const [dashboard,setDashBoard] = useState(true);
    const [accountManager,setAccountManager] = useState(false);
    const [eventManager,setEventManager] = useState(false);
    const [orderManager,setOrderManager] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);
    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if(token == null || token == ""){
            navigator("/Login");
        }
    },[navigator, tokenContext])
    const handleLogOut = () => {
        logout();
        navigator("/Login")
    }
    const openDashBoard = () => {
        setDashBoard(true);
        setOrderManager(false);
        setAccountManager(false);
        setEventManager(false);
    }
    const openAccountManager = () => {
        setAccountManager(true);
        setDashBoard(false);
        setOrderManager(false);
        setEventManager(false);
    }
    const openEventManager = () => {
        setEventManager(true);
        setDashBoard(false);
        setOrderManager(false);
        setAccountManager(false);
    }
    const openOrderManager = () => {
        setOrderManager(true);
        setDashBoard(false);
        setAccountManager(false);
        setEventManager(false);
    }
    return (
        <div>
            {(roleContext == "ADMIN" || roleContext == "MANAGER") && (
                <div className={"d-flex "} >
                    <div className={"adminLeft bg-info"} style={{width: "20%" ,height: "100vh",position: "sticky" ,top:"0" }}>
                        <Link to={"/"}><h3
                            className={"d-flex justify-content-center mt-4 text-black fw-bold"}>NTNRunning</h3></Link>
                        <div className={"d-grid ps-5 pe-1 mt-5"}>
                            <button className={`${dashboard ? "buttonSelect" : "buttonDashboard"} my-1 `} onClick={openDashBoard}><MdDashboard/> Dashboard</button>
                            <button className={`${accountManager ? "buttonSelect" : "buttonDashboard"} my-1 `} onClick={openAccountManager}><RiAccountBox2Line/> Quản Lý Tài Khoản</button>
                            <button className={`${eventManager ? "buttonSelect" : "buttonDashboard"} my-1 `} onClick={openEventManager}><MdOutlineEventNote/> Quản Lý Sự Kiện</button>
                            <button className={`${orderManager ? "buttonSelect" : "buttonDashboard"} my-1 `} onClick={openOrderManager}><CiShop/> Quản Lý Đơn Hàng</button>
                        </div>
                    </div>
                    <div className={"adminRight w-100 h-100"}>
                        <div className={"menuTop bg-dark w-100 d-flex justify-content-between align-content-center"} style={{height: "10vh"}}>
                            <div style={{width: "fit-content"}} className={"ms-5 mt-3"}>
                                <Link to={"/"} className={"text-info"}><FaHome className={"text-info"}/> Trang Chủ</Link>
                            </div>
                            <div style={{width: "fit-content",height: "fit-content", borderRadius: "20px", marginRight: "100px"}}
                                 className={"float-end mt-3 bg-white"}>
                                {usernameContext ? (
                                    <Dropdown isOpen={dropdownOpen} toggle={toggle} style={{border: "none"}}>
                                        <DropdownToggle
                                            tag="div"
                                            data-toggle="dropdown"
                                            aria-expanded={dropdownOpen}
                                            className="btn btn-sm btn-outline-primary d-flex align-items-center border-0 p-2">
                                            <FaUser className="me-2"/>
                                            <span>{usernameContext}</span>
                                        </DropdownToggle>
                                        <DropdownMenu style={{marginTop: "30px"}}>
                                            <DropdownItem className={"drop_item text-decoration-none text-dark"}
                                                          onClick={handleLogOut}>
                                                <CiLogout className="me-2"/> Đăng xuất
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                ) : (
                                    <Link className="btn btn-primary btn-sm " to="/Login">
                                        Đăng Nhập
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div>
                            {dashboard && <Dashboard/>}
                            {accountManager && <AccountManager/>}
                            {eventManager && <EventManager/>}
                            {orderManager && <OrderManager/>}
                        </div>
                    </div>

                </div>
            )}
        </div>
    )
}
export default Admin;
