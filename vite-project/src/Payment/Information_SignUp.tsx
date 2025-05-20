import React, {useContext, useEffect, useRef, useState} from "react";
import {IoIosArrowBack} from "react-icons/io";
import "./Information_SignUp.css"
import {CiBank, CiCalendarDate, CiLocationOn} from "react-icons/ci";
import { useNavigate, useParams} from "react-router-dom";
import {Button} from "reactstrap";
import {AuthContext} from "../Context/AuthContext.tsx";
const Information_SignUp = () => {
    const { id} = useParams();
    const navigate = useNavigate();
    const { tokenContext,idContext } = useContext(AuthContext);

    const [events,setEvents] = useState(null);

    const [gender, setGender] = useState<string>("true");
    const [distance, setDistance] = useState<string>("");
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


    const [selectedPrice, setSelectedPrice] = useState(0);
    const formRef = useRef<HTMLFormElement>(null);
    const [paymentMethod,setPaymentMethod] = useState("VNPay");
    const [isValid, setIsValid] = useState(true);
    const [isValidCCCD, setIsValidCCCD] = useState(true);
    const [isValidSDT, setIsValidSDT] = useState(true);
    const [isValidSDTKC, setIsValidSDTKC] = useState(true);



    const handleSubmit = async () => {
        if (formRef.current && formRef.current.checkValidity()) {
            const reponse = await fetch(`http://localhost:8080/TicketRunning/Event/Payment/vn-pay?amount=${selectedPrice}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${tokenContext}`
                },
                body: JSON.stringify({
                    userName: nameSignUp,
                    phoneNumber: phoneSignUp,
                    identityCard: CCCDSignUp,
                    email: emailSignUp,
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
                    eventDistance: distance,
                    eventId: id,
                    eventPrice: selectedPrice,
                    idUser: idContext
                }),
            });
            if(reponse.ok) {
                const data = await reponse.json();
                console.log("Dữ liệu đã lưu: idCustomerInformation" +data.result);
                window.location.href = data.result.payUrl;
            }else {
                console.log(reponse)
            }
        } else {
            formRef.current?.reportValidity();
        }
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
    const validateSDTKC = (number) => {
        if(number.length != 10){
            setIsValidSDTKC(false);
        }else{
            setIsValidSDTKC(true);
        }
    }


    useEffect(() => {
        if (!id) return;
        fetch(`http://localhost:8080/TicketRunning/event/eventDetail?id=${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Lỗi khi lấy dữ liệu!");
                }
                return response.json();
            })
            .then(data => {
                setEvents(data.result);
            })
            .catch(error => console.error("Lỗi:", error));
    }, []);
    const handleSelectChange = (event) => {
        const selected = event.target.value;
        setDistance(selected);
        const selectedItem = events.listPrice.find((item) => item.distance === selected);
        setSelectedPrice(selectedItem ? selectedItem.price : null);
    };
    return(
        <div className={"container_informationSignUp mx-5 d-flex"} style={{marginTop: "90px"}}>
            <div className={"left my-4"}>
                <div className={"d-flex"}>
                    <IoIosArrowBack className={"cursor-pointer fs-1"} onClick={() => navigate(-1)}/>
                    <h3 className={"mx-auto fw-bold text-info"}>Đăng Ký Giải Chạy</h3>
                </div>
                <form className={"mx-3"} ref={formRef}>
                    <div className={"distance_Event my-3"}>
                        <p className={"fs-5 fst-italic"} style={{color: "orange"}}>Chọn Cự Ly:</p>
                        <div className={"d-flex distance"}>
                            <select
                                className="form-select"
                                value={distance}
                                onChange={handleSelectChange} required={true}>
                                <option value="">Chọn Cự Ly</option>
                                {events?.listPrice?.map((item, index) => (
                                    <option key={index} value={item.distance} >
                                        {item.distance}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={"fillInfor mb-3"}>
                        <p className={"fs-5 fst-italic"} style={{color: "orange"}}>Thông Tin Cá Nhân</p>
                        <div className={"d-flex mb-3"}>
                            <div className="inforInput inforName form-floating ">
                                <input type="text" className="form-control" id="floatingInput"
                                       placeholder="Nhập Họ Và Tên" required={true} onChange={(e) => setNameSignUp(e.target.value)}/>
                                <label htmlFor="floatingInput" className={"fst-italic"} style={{color: "#9a9a9a"}}>Họ Và
                                    Tên </label>
                            </div>
                            <div className="inforInput inforPhone form-floating ">
                                <input type="number" className="form-control" id="floatingInput" maxLength={10}
                                       placeholder="Nhập Số Điện Thoại" required={true} onChange={(e) => {setPhoneSignUp(e.target.value) ;
                                    validateSDT(e.target.value)}}/>
                                <label htmlFor="floatingInput" className={"fst-italic"} style={{color: "#9a9a9a"}}>Số Điện Thoại </label>
                                {!isValidSDT && (<p className={"text-danger"}>Số điện thoại bao gồm 10 số.</p>)}
                            </div>
                        </div>
                        <div className={"d-flex mb-3"}>
                            <div className="inforInput inforEmail form-floating">
                                <input type="email" className="form-control" id="floatingInput"
                                       placeholder="Nhập Email" required={true} onChange={(e) =>{ setEmailSignUp(e.target.value);
                                    setIsValid(validateEmail(e.target.value))
                                }}/>
                                <label htmlFor="floatingInput" className={"fst-italic"}
                                       style={{color: "#9a9a9a"}}>Email </label>
                                {!isValid && (<p className={"text-danger"}>Email sai định dạng.</p>)}
                            </div>

                            <div className="inforInput inforCCCD form-floating">
                                <input type="number" className="form-control" id="floatingInput"
                                       placeholder="Nhập CCCD/CMND" required={true} onChange={(e) =>{ setCCCDSignUp(e.target.value);
                                validateCCCD(e.target.value)}}/>
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
                                <input type="date" className="form-control" id="floatingInput"
                                       placeholder="Nhập Email" required={true} onChange={(e) => setBirthSignUp(e.target.value)}/>
                                <label htmlFor="floatingInput" className={"fst-italic"}
                                       style={{color: "#9a9a9a"}}>Ngày Sinh </label>
                            </div>
                        </div>
                        <div className={"d-flex mb-3"}>
                            <div className="inforInput inforQT form-floating">
                                <input type="text" className="form-control" id="floatingInput"
                                       placeholder="Nhập Quôc tịch" required={true} onChange={(e) => setQTSignUp(e.target.value)}/>
                                <label htmlFor="floatingInput" className={"fst-italic"}
                                       style={{color: "#9a9a9a"}}>Quốc Tịch </label>
                            </div>
                            <div className="inforInput inforQG form-floating">
                                <input type="text" className="form-control" id="floatingInput"
                                       placeholder="Nhập Quốc Gia" required={true} onChange={(e) => setQGSignUp(e.target.value)}/>
                                <label htmlFor="floatingInput" className={"fst-italic"}
                                       style={{color: "#9a9a9a"}}>Quốc Gia </label>
                            </div>
                        </div>
                        <div className="inforTP form-floating">
                            <input type="text" className="form-control" id="floatingInput"
                                   placeholder="Nhập Thành Phố" required={true} onChange={(e) => setTPSignUp(e.target.value)}/>
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
                                <input type="text" className="form-control" id="floatingInput"
                                       placeholder="Nhập Tên Người Liên Lạc Khẩn Cấp" required={true} onChange={(e) => setNameKCSignUp(e.target.value)}/>
                                <label htmlFor="floatingInput" className={"fst-italic"}
                                       style={{color: "#9a9a9a"}}>Tên Người Liên Lạc Khẩn Cấp </label>
                            </div>
                        </div>
                        <div className="inforPhoneKC form-floating" style={{width: "48%"}}>
                            <input type="number" className="form-control" id="floatingInput"
                                   placeholder="Nhập Số Điện Thoại Khẩn Cấp" required={true} onChange={(e) => {setPhoneKCSignUp(e.target.value); validateSDTKC(e.target.value)}}/>
                            <label htmlFor="floatingInput" className={"fst-italic"}
                                   style={{color: "#9a9a9a"}}>Số Điện Thoại Khẩn Cấp </label>
                            {!isValidSDTKC && (<p className={"text-danger"}>Số điện thoại bao gồm 10 số.</p>)}

                        </div>
                    </div>
                    <div className={"inforMedicine my-3"}>
                        <p className={"fs-5 fst-italic"} style={{color: "orange"}}>Thông Tin Y Tế</p>
                        <div className={"d-flex mb-3"}>
                            <div className="inforInput inforNM form-floating">
                                <input type="text" className="form-control" id="floatingInput"
                                       placeholder="Nhập Nhóm Máu" required={true} onChange={(e) => setNMSignUp(e.target.value)}/>
                                <label htmlFor="floatingInput" className={"fst-italic"}
                                       style={{color: "#9a9a9a"}}>Nhóm Máu </label>
                            </div>
                            <div className="inforInput  inforMedicine form-floating">
                                <input type="text" className="form-control" id="floatingInput"
                                       placeholder="Nhập Thông Tin Y Tế" required={true} onChange={(e) => setTTYTSignUp(e.target.value)}/>
                                <label htmlFor="floatingInput" className={"fst-italic"}
                                       style={{color: "#9a9a9a"}}>Thông Tin Y Tế</label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            {events ? (<div className={"right"}>
                <div className={"summarize m-3 pb-3"}>
                    <div className={"summarize_avatar"}>
                        <img src={events.avatar} className={"w-100"}/>
                    </div>
                    <div className={"summarize_infor mx-3"}>
                        <h5 className={"summarize_nameEvent"}>{events.name}</h5>
                        <p className={"summarize_dateEvent mt-2 "}><CiCalendarDate
                            style={{color: "red"}}/> {events.eventDate}</p>
                        <p className={"summarize_location"}><CiLocationOn
                            style={{color: "red"}}/> {events.location}</p>
                        <div className={"solid"}></div>
                        <div className={"summarize_containerSellTicket px-5 mt-3"}>
                            {distance ? (<div className={"d-flex justify-content-center align-content-center"}><span
                                className={"align-content-center"}>Cự Ly Đăng Ký:</span> <span
                                className={"ms-2 text-success fs-4"}> {distance}</span></div>) : ("")}
                            <div className={"d-flex justify-content-center"}>
                                <span className={"align-content-center"}>Tạm Tính: </span>
                                <span className={"text-danger fs-4 fst-italic ms-3"}>{new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND"
                                }).format(selectedPrice)}</span>
                            </div>
                            <div className={"mb-3"}>
                                <label><CiBank className={"text-danger fs-3"}/> Phương thức thanh toán:</label>
                                <select
                                    className="form-select"
                                    value={paymentMethod}
                                    required={true}
                                    onChange={(e) => setPaymentMethod(e.target.value)}>
                                    <option value="VNPay"><img src={"./VNPay"}></img>VNPay</option>

                                </select>
                            </div>
                            <Button onClick={handleSubmit}
                                    className="summarize_sellTicketButton d-flex justify-content-center p-3  m-auto mb-3">Thanh
                                Toán</Button>
                        </div>
                    </div>
                </div>
            </div>) : (<div>Đang tải dữ liệu...</div>)}
        </div>
    )
}
export default Information_SignUp;
