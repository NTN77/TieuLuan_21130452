import React, {useContext, useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {AuthContext} from "../../Context/AuthContext.tsx";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {IoIosArrowRoundBack} from "react-icons/io";
import Loading from "../../Payment/Loading.tsx";

const CreateEvent = ({cancelCreateEvent}) => {
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [avatarImage, setAvatarImage] = useState(null);
    const [ticketImages, setTicketImages] = useState(null);
    const [policyImages, setPolicyImages] = useState(null);
    const [racekitImages, setRacekitImages] = useState(null);
    const [scheduleImages, setScheduleImages] = useState(null);
    const [awardImages, setAwardImages] = useState(null);
    const [ticketStages, setTicketStages] = useState([]);
    const [loading,setLoading] = useState(false);
    const { tokenContext,idContext } = useContext(AuthContext);
    const { usernameContext,roleContext } = useContext(AuthContext);
    const navigator = useNavigate();
    useEffect(() => {
        if(usernameContext == null || usernameContext == "" ){
            navigator("/Login");
        }
    },[navigator, roleContext, usernameContext])
    // Xóa ảnh
    const handleRemoveImage = (setImageState) => {
        setImageState(null);
    };

    // Cập nhật thông tin giai đoạn vé
    const handleStageChange = (index, field, value) => {
        const numericValue = parseFloat(value.replace(/\D/g, ''));
        const newStages = [...ticketStages];
        newStages[index][field] = numericValue;
        setTicketStages(newStages);
    };

    const handleAddStage = () => {
        setTicketStages([...ticketStages, { name: "", distance: "", price: "", dateStart: "", dateFinish: "" }]);
    };

    // Xóa một giai đoạn vé
    const handleRemoveStage = (index) => {
        setTicketStages(ticketStages.filter((_, i) => i !== index));
    };

    // Cập nhật thông tin giai đoạn vé
    const handleImageChange = (event, setImageState) => {
        const file = event.target.files[0];
        if (file) {
            setImageState(file);
        }
    };


    // Gửi dữ liệu lên backend
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const formData = new FormData();

        formData.append("name", eventName);
        formData.append("description", eventDescription);
        formData.append("location", eventLocation);
        formData.append("eventDate", eventDate);
        formData.append("ticketStages", JSON.stringify(ticketStages));
        formData.append("fileAvatar", avatarImage);
        formData.append("priceTicket", ticketImages);
        formData.append("policy", policyImages);
        formData.append("sizeChart", racekitImages);
        formData.append("schedule", scheduleImages);
        formData.append("award", awardImages);

        try {
            const response = await fetch(`http://localhost:8080/TicketRunning/event/createEvent?idAdmin=${idContext}`, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${tokenContext}`
                },
            });

            if (!response.ok) {
                throw new Error(`Lỗi: ${response.status} - ${response.statusText}`);
            }
            setLoading(false);
            Swal.fire({
                title: "Đăng Ký Thành Công!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
        } catch (error) {
            console.error("Lỗi khi tạo sự kiện:", error);
        }

    };

    //format gia
    const formatCurrency = (value) => {
        if (!value) return "";
        return Number(value.toString().replace(/\D/g, "")).toLocaleString("vi-VN");
    };
    return (
        <div className="container ">
            <div className="d-flex mt-1 justify-content-between align-items-center ">
                <IoIosArrowRoundBack onClick={cancelCreateEvent} className="cursor-pointer me-3 fs-1"/>
                <h3 className="text-center mb-3" style={{marginRight:"45%"}}>Tạo sự kiện</h3>
            </div>
            <form onSubmit={handleSubmit} className="card p-4 shadow overflow-y-auto " style={{height:"80vh" , borderRadius:"20px"}}>
            <div className="mb-3">
                    <label className="form-label">Tên sự kiện:</label>
                    <input type="text" className="form-control" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Mô tả sự kiện:</label>
                    <textarea className="form-control" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} required />
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Nơi diễn ra:</label>
                        <input type="text" className="form-control" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} required />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Ngày diễn ra:</label>
                        <input type="date" className="form-control" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
                    </div>
                </div>
                {/* Upload ảnh Avatar */}
                <div className="mb-3">
                    <label className="form-label">Ảnh Avatar:</label>
                    <input type="file" className="form-control" onChange={(e) => handleImageChange(e, setAvatarImage)} />
                    {avatarImage && <img src={URL.createObjectURL(avatarImage)} alt="Avatar Preview" className="mt-2" width="100" />}
                </div>

                {/* Giai đoạn bán vé */}
                <h3>Giai đoạn bán vé:</h3>
                {ticketStages.map((stage, index) => (
                    <div key={index} className="border p-3 mb-3">
                        <input type="text" className="form-control mb-2" placeholder="Tên giai đoạn" value={stage.name}
                               onChange={(e) => handleStageChange(index, "name", e.target.value)} required/>
                        <input type="text" className="form-control mb-2" placeholder="Cự ly" value={stage.distance}
                               onChange={(e) => handleStageChange(index, "distance", e.target.value)} required/>
                        <div className={"input-group"}>
                            <input type="text" className="form-control mb-2" placeholder="Giá vé"
                                   value={formatCurrency(stage.price)}
                                   onChange={(e) => handleStageChange(index, "price", e.target.value)} required/>
                            <span className="input-group-text mb-2">VND</span>
                        </div>
                        <input type="date" className="form-control mb-2" value={stage.dateStart}
                               onChange={(e) => handleStageChange(index, "dateStart", e.target.value)} required/>
                        <input type="date" className="form-control mb-2" value={stage.dateFinish}
                               onChange={(e) => handleStageChange(index, "dateFinish", e.target.value)} required/>
                        <button type="button" className="btn btn-danger" onClick={() => handleRemoveStage(index)}>Xóa
                        </button>
                    </div>
                ))}
                <button type="button" className="btn btn-success mb-3" onClick={handleAddStage}>+ Thêm giai đoạn
                </button>

                {/* Upload ảnh */}
                {[
                    {label: "Ảnh Vé", state: ticketImages, setState: setTicketImages},
                    {label: "Ảnh Chính Sách", state: policyImages, setState: setPolicyImages},
                    {label: "Ảnh Racekit", state: racekitImages, setState: setRacekitImages },
                    { label: "Ảnh Lịch Trình", state: scheduleImages, setState: setScheduleImages },
                    { label: "Ảnh Giải Thưởng", state: awardImages, setState: setAwardImages }
                ].map(({ label, state, setState }, index) => (
                    <div key={index} className="mb-3">
                        <label className="form-label">{label}:</label>
                        <input type="file" className="form-control" onChange={(e) => handleImageChange(e, setState)} />
                        {state && (
                            <div className="mt-2 position-relative">
                                <img src={URL.createObjectURL(state)} alt="Preview" className="border rounded" width="100" height="100" />
                                <button type="button" className="btn btn-danger btn-sm position-absolute top-0 end-0" onClick={() => handleRemoveImage(setState)}>✕</button>
                            </div>
                        )}
                    </div>
                ))}


                <button type="submit" className="buttonCreate btn btn-primary w-100" disabled={ticketStages.length === 0}>Tạo sự kiện</button>
            </form>
            {loading && (<Loading/>)}
        </div>
    );
};

export default CreateEvent;
