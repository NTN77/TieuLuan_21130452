import React, {useContext, useEffect, useState} from "react";
import "./EditCustomerInformation.css"
import {IoMdArrowRoundBack} from "react-icons/io";
import {AuthContext} from "../../Context/AuthContext.tsx";
import Loading from "../../Payment/Loading.tsx";
import Swal from "sweetalert2";
const EditCustomerInformation = ({Customer,cancelEdit}) => {
    const [gender, setGender] = useState<string>("true");
    const [size,setSize] = useState("");
    const [nameSignUp,setNameSignUp] = useState("");
    const [phoneSignUp,setPhoneSignUp] = useState("");
    const [emailSignUp,setEmailSignUp] = useState("");
    const [CCCDSignUp,setCCCDSignUp] = useState("");
    const [birthSignUp,setBirthSignUp] = useState("");
    const [QTSignUp,setQTSignUp] = useState("");
    const [QGSignUp,setQGSignUp] = useState("");
    const [TPSignUp,setTPSignUp] = useState("");
    const [nameKCSignUp,setNameKCSignUp] = useState("");
    const [phoneKCSignUp,setPhoneKCSignUp] = useState("");
    const [NMSignUp,setNMSignUp] = useState("");
    const [TTYTSignUp,setTTYTSignUp] = useState("");
    const [isValid, setIsValid] = useState(true);
    const [isValidCCCD, setIsValidCCCD] = useState(true);
    const [isValidSDT, setIsValidSDT] = useState(true);
    const { tokenContext } = useContext(AuthContext);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        console.log(Customer);
        if (Customer) {
            setNameSignUp(Customer.userName);
            setPhoneSignUp(Customer.phoneNumber);
            setEmailSignUp(Customer.email);
            setCCCDSignUp(Customer.identityCard);
            setBirthSignUp(Customer.birthDate);
            setQTSignUp(Customer.nationality);
            setQGSignUp(Customer.country);
            setTPSignUp(Customer.province);
            setGender(Customer.gender?.toString());
            setSize(Customer.sizeChart);
            setNameKCSignUp(Customer.userNameKC);
            setPhoneKCSignUp(Customer.phoneNumberKC);
            setNMSignUp(Customer.bloodGroup);
            setTTYTSignUp(Customer.healthCare);
        }
    }, [Customer]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
            const reponse = await fetch(`http://localhost:8080/TicketRunning/admin/editInformationSignIn`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenContext}`
                },
                body: JSON.stringify({
                    userName: nameSignUp,
                    phoneNumber: phoneSignUp,
                    identityCard: CCCDSignUp,
                    gender: gender,
                    birthDate: birthSignUp,
                    nationality: QTSignUp,
                    country: QGSignUp,
                    province: TPSignUp,
                    sizeChart: size,
                    userNameKC: nameKCSignUp,
                    phoneNumberKC:phoneKCSignUp,
                    bloodGroup: NMSignUp,
                    healthCare: TTYTSignUp,
                    idUser: Customer.id
                }),
            });
            if(reponse.ok) {
                setLoading(false);
                const data = await reponse.json();
                console.log("Dữ liệu đã lưu: idCustomerInformation" +data.result);
                if(data.result) {
                    Swal.fire({
                        title: "Chỉnh sửa Thành Công!",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                }else{
                    Swal.fire({
                        title: "Không có dữ liệu cần chỉnh sửa!",
                        icon: "error",
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            }else {
                setLoading(false);
                Swal.fire({
                    title: "Lỗi!" + reponse,
                    icon: "error",
                    timer: 2000,
                    showConfirmButton: false
                });            }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validateCCCD = (number) => {
        if(number.length != 12){
            setIsValidCCCD(false);
        }else{
            setIsValidCCCD(true);
        }
    }
    const validateSDT = (number) => {
        if(number.length != 10){
            setIsValidSDT(false);
        }else{
            setIsValidSDT(true);
        }
    }

    return(
        <div className={"overlay"}>
            <div className={"containerEdit w-75 mx-auto overflow-x-auto"}>
                <form onSubmit={handleSubmit}>
                <div className="d-flex mt-3 justify-content-between align-items-center">
                    <IoMdArrowRoundBack onClick={cancelEdit} className="cursor-pointer fs-5 me-5"/>
                    <h3 className={"text-success text-center mb-0 mx-auto"}>Chỉnh Sửa Thông Tin Đăng Ký</h3>
                </div>
                <div className={"fillInfor mb-3"}>
                    <p className={"fs-5 fst-italic"} style={{color: "orange"}}>Thông Tin Cá Nhân</p>
                    <div className={"d-flex mb-3"}>
                        <div className="inforInput inforName form-floating ">
                            <input type="text" className="form-control" id="floatingInput" value={nameSignUp}
                                   placeholder="Nhập Họ Và Tên" required={true}
                                   onChange={(e) => setNameSignUp(e.target.value)}/>
                            <label htmlFor="floatingInput" className={"fst-italic"} style={{color: "#9a9a9a"}}>Họ Và
                                Tên </label>
                        </div>
                        <div className="inforInput inforPhone form-floating ">
                            <input type="number" className="form-control" id="floatingInput" maxLength={10}
                                   value={phoneSignUp}
                                   placeholder="Nhập Số Điện Thoại" required={true} onChange={(e) => {
                                setPhoneSignUp(e.target.value);
                                validateSDT(e.target.value)
                            }}/>
                            <label htmlFor="floatingInput" className={"fst-italic"} style={{color: "#9a9a9a"}}>Số Điện
                                Thoại </label>
                            {!isValidSDT && (<p className={"text-danger"}>Số điện thoại bao gồm 10 số.</p>)}
                        </div>
                    </div>
                    <div className={"d-flex mb-3"}>
                        <div className="inforInput inforEmail form-floating">
                            <input type="email" className="form-control" id="floatingInput" value={emailSignUp} disabled={true}
                                   placeholder="Nhập Email" required={true} onChange={(e) => {
                                setEmailSignUp(e.target.value);
                                setIsValid(validateEmail(e.target.value))
                            }}/>
                            <label htmlFor="floatingInput" className={"fst-italic"}
                                   style={{color: "#9a9a9a"}}>Email </label>
                            {!isValid && (<p className={"text-danger"}>Email sai định dạng.</p>)}
                        </div>

                        <div className="inforInput inforCCCD form-floating">
                            <input type="number" className="form-control" id="floatingInput" value={CCCDSignUp}
                                   placeholder="Nhập CCCD/CMND" required={true} onChange={(e) => {
                                setCCCDSignUp(e.target.value);
                                validateCCCD(e.target.value)
                            }}/>
                            <label htmlFor="floatingInput" className={"fst-italic"}
                                   style={{color: "#9a9a9a"}}>CCCD</label>
                            {!isValidCCCD && (<p className={"text-danger"}>CCCD bao gồm 12 số.</p>)}
                        </div>

                    </div>
                    <div className={"d-flex mb-3"}>
                        <div className="inforInput inforGender">
                            <select
                                className="form-select"
                                value={gender}
                                required={true}
                                onChange={(e) => setGender(e.target.value)}>
                                <option value="true">Nam</option>
                                <option value="false">Nữ</option>
                            </select>
                        </div>
                        <div className="inforInput inforBirdthDay form-floating">
                            <input type="date" className="form-control" id="floatingInput" value={birthSignUp}
                                   placeholder="Nhập Email" required={true}
                                   onChange={(e) => setBirthSignUp(e.target.value)}/>
                            <label htmlFor="floatingInput" className={"fst-italic"}
                                   style={{color: "#9a9a9a"}}>Ngày Sinh </label>
                        </div>
                    </div>
                    <div className={"d-flex mb-3"}>
                        <div className="inforInput inforQT form-floating">
                            <input type="text" className="form-control" id="floatingInput" value={QTSignUp}
                                   placeholder="Nhập Quôc tịch" required={true}
                                   onChange={(e) => setQTSignUp(e.target.value)}/>
                            <label htmlFor="floatingInput" className={"fst-italic"}
                                   style={{color: "#9a9a9a"}}>Quốc Tịch </label>
                        </div>
                        <div className="inforInput inforQG form-floating">
                            <input type="text" className="form-control" id="floatingInput" value={QGSignUp}
                                   placeholder="Nhập Quốc Gia" required={true}
                                   onChange={(e) => setQGSignUp(e.target.value)}/>
                            <label htmlFor="floatingInput" className={"fst-italic"}
                                   style={{color: "#9a9a9a"}}>Quốc Gia </label>
                        </div>
                    </div>
                    <div className="inforTP form-floating">
                        <input type="text" className="form-control" id="floatingInput" value={TPSignUp}
                               placeholder="Nhập Thành Phố" required={true}
                               onChange={(e) => setTPSignUp(e.target.value)}/>
                        <label htmlFor="floatingInput" className={"fst-italic"}
                               style={{color: "#9a9a9a"}}>Tỉnh\Thành Phố Đang Sinh Sống</label>
                    </div>
                </div>
                <div className={"inforAdd"}>
                    <p className={"fs-5 fst-italic"} style={{color: "orange"}}>Thông Tin Bổ Sung</p>
                    <div className={"d-flex mb-3"}>
                        <div className={"inforInput inforSize"}>
                            <label>Chọn size áo:</label>
                            <select
                                className="form-select"
                                value={size}
                                required={true}
                                onChange={(e) => setSize(e.target.value)}>
                                <option value="2XS">2XS</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="2XL">2XL</option>
                            </select>
                        </div>
                        <div className="inforInput inforNameKC form-floating">
                            <input type="text" className="form-control" id="floatingInput" value={nameKCSignUp}
                                   placeholder="Nhập Tên Người Liên Lạc Khẩn Cấp" required={true}
                                   onChange={(e) => setNameKCSignUp(e.target.value)}/>
                            <label htmlFor="floatingInput" className={"fst-italic"}
                                   style={{color: "#9a9a9a"}}>Tên Người Liên Lạc Khẩn Cấp </label>
                        </div>
                    </div>
                    <div className="inforPhoneKC form-floating" style={{width: "48%"}}>
                        <input type="number" className="form-control" id="floatingInput" value={phoneKCSignUp}
                               placeholder="Nhập Số Điện Thoại Khẩn Cấp" required={true}
                               onChange={(e) => setPhoneKCSignUp(e.target.value)}/>
                        <label htmlFor="floatingInput" className={"fst-italic"}
                               style={{color: "#9a9a9a"}}>Số Điện Thoại Khẩn Cấp </label>
                    </div>
                </div>
                <div className={"inforMedicine my-3"}>
                    <p className={"fs-5 fst-italic"} style={{color: "orange"}}>Thông Tin Y Tế</p>
                    <div className={"d-flex mb-3"}>
                        <div className="inforInput inforNM form-floating">
                            <input type="text" className="form-control" id="floatingInput" value={NMSignUp}
                                   placeholder="Nhập Nhóm Máu" required={true}
                                   onChange={(e) => setNMSignUp(e.target.value)}/>
                            <label htmlFor="floatingInput" className={"fst-italic"}
                                   style={{color: "#9a9a9a"}}>Nhóm Máu </label>
                        </div>
                        <div className="inforInput  inforMedicine form-floating">
                            <input type="text" className="form-control" id="floatingInput" value={TTYTSignUp}
                                   placeholder="Nhập Thông Tin Y Tế" required={true}
                                   onChange={(e) => setTTYTSignUp(e.target.value)}/>
                            <label htmlFor="floatingInput" className={"fst-italic"}
                                   style={{color: "#9a9a9a"}}>Thông Tin Y Tế</label>
                        </div>
                    </div>
                </div>
                <button type={"submit"} className={"btnHover mx-auto d-flex bg-success text-white"}>Lưu Chỉnh Sửa
                </button>
                </form>
            </div>
            {loading && (<Loading/>)}
        </div>
    )
}
export default EditCustomerInformation;
