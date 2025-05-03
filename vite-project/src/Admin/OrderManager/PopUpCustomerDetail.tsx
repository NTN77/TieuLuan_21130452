import {MdOutlineCancel} from "react-icons/md";

import "./PopUpCustomerDetail.css"

const PopUpCustomerDetail = ({customer,cancel}) => {
    const formatCurrency = (value) => {
        if (!value) return "";
        return Number(value.toString().replace(/\D/g, "")).toLocaleString("vi-VN");
    };
    return(
        <div className={"overlay"}>
            <div className={"containerPopUp p-3 w-50"}>
                <div className="d-flex mt-3 justify-content-between align-items-center">
                    <h3 className="text-center mb-0 mx-auto">Thông tin chi tiết</h3>
                    <MdOutlineCancel onClick={cancel} className="cursor-pointer"/>
                </div>
                <div className={"information"}>
                    <div className={"d-flex justify-content-between px-4 mt-2"}>
                        <div className={"d-flex"}>
                            <label className={"fw-bold"}>Cự ly: </label>
                            <p className={"mb-0 ms-2"}>{customer.eventDistance}</p>
                        </div>
                        <div className={"d-flex"}>
                        <label className={"fw-bold"}>Giá mua: </label>
                            <p className={"mb-0 ms-2"}>{formatCurrency(customer.eventPrice)} VND</p>
                        </div>
                    </div>
                    <p className={"fs-4 text-danger"}>Thông tin cơ bản:</p>
                    <div className={"d-flex justify-content-between px-4"}>
                        <div className={"d-flex"}>
                            <label className={"fw-bold"}>Họ và tên: </label>
                            <p className={"ms-2"}>{customer.userName}</p>
                        </div>
                        <div className={"d-flex"}>
                            <label className={"fw-bold"}>Email: </label>
                            <p className={"ms-2"}>{customer.email}</p>
                        </div>
                    </div>
                    <div className={"d-flex justify-content-between px-4"}>
                        <div className={"d-flex"}>
                            <label className={"fw-bold"}>Số điện thoại: </label>
                            <p className={"ms-2"}>{customer.phoneNumber}</p>
                        </div>
                        <div className={"d-flex"}>
                            <label className={"fw-bold"}>Căn cước công dân: </label>
                            <p className={"ms-2"}>{customer.identityCard}</p>
                        </div>
                    </div>
                    <div className={"d-flex justify-content-between px-4"}>
                        <div className={"d-flex"}>
                            <label className={"fw-bold"}>Giới tính: </label>
                            <p className={"ms-2"}>{customer.gender ? "Nam" : "Nữ"}</p>
                        </div>
                        <div className={"d-flex"}>
                            <label className={"fw-bold"} >Ngày sinh: </label>
                            <p className={"ms-2"}>{customer.birthDate}</p>
                        </div>
                    </div>
                    <div className={"d-flex justify-content-between px-4"}>
                        <div className={"d-flex"}>
                            <label className={"fw-bold"}>Quốc tịch: </label>
                            <p className={"ms-2"}>{customer.nationality}</p>
                        </div>
                        <div className={"d-flex"}>
                            <label className={"fw-bold"}>Quốc gia: </label>
                            <p className={"ms-2"}>{customer.country}</p>
                        </div>
                    </div>
                    <div className={"d-flex justify-content-between px-4"}>
                        <div className={"d-flex"}>
                            <label className={"fw-bold"}>Tỉnh\Thành Phố đang sinh sống: </label>
                            <p className={"ms-2"}>{customer.province}</p>
                        </div>
                    </div>

                    <div>
                        <p className={"text-danger fs-4"}>Thông tin bổ sung:</p>
                        <div className={"d-flex justify-content-between px-4"}>
                            <div className={"d-flex"}>
                                <label className={"fw-bold"}>Size áo: </label>
                                <p className={"ms-2"}>{customer.sizeChart}</p>
                            </div>
                            <div className={"d-flex"}>
                                <label className={"fw-bold"}>Tên người liên lạc khẩn cấp: </label>
                                <p className={"ms-2"} >{customer.userNameKC}</p>
                            </div>
                        </div>
                        <div className={"d-flex justify-content-between px-4"}>
                            <div className={"d-flex"}>
                                <label className={"fw-bold"}>Số điện thoại của người khẩn cấp: </label>
                                <p className={"ms-2"}>{customer.phoneNumberKC}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className={"text-danger fs-4"}>Thông tin y tế:</p>
                        <div className={"d-flex justify-content-between px-4"}>
                            <div className={"d-flex"}>
                                <label className={"fw-bold"}>Nhóm máu: </label>
                                <p className={"ms-2"}>{customer.bloodGroup}</p>
                            </div>
                            <div className={"d-flex"}>
                                <label className={"fw-bold"}>Thông tin y tế: </label>
                                <p className={"ms-2"}>{customer.healthCare}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PopUpCustomerDetail;
