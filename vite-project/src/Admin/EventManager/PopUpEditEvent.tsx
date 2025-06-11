import React, {useContext, useEffect, useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {AuthContext} from "../../Context/AuthContext.tsx";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {IoIosArrowRoundBack} from "react-icons/io";
import Loading from "../../Payment/Loading.tsx";

const PopUpEditEvent = ({idEvent,cancelEditEvent}) => {
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventLocation, setEventLocation] = useState("");
    const [eventDate, setEventDate] = useState("");
    const [avatarImage, setAvatarImage] = useState(null);
    const [avatarUrlOld, setAvatarUrlOld] = useState(null);
    const [ticketImages, setTicketImages] = useState(null);
    const [ticketImagesOld, setTicketImagesOld] = useState(null);

    const [policyImages, setPolicyImages] = useState(null);
    const [policyImagesOld, setPolicyImagesOld] = useState(null);

    const [racekitImages, setRacekitImages] = useState(null);
    const [racekitImagesOld, setRacekitImagesOld] = useState(null);


    const [scheduleImages, setScheduleImages] = useState(null);
    const [scheduleImagesOld, setScheduleImagesOld] = useState(null);

    const [awardImages, setAwardImages] = useState(null);
    const [awardImagesOld, setAwardImagesOld] = useState(null);

    const [ticketStages, setTicketStages] = useState([]);
    const [loading,setLoading] = useState(false);
    const { usernameContext,tokenContext,idContext } = useContext(AuthContext);
    const navigator = useNavigate();
    //hàm giúp upload ảnh cũ lên để chỉnh sửa
    const handleImageChangeAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarImage(file);
            setAvatarUrlOld(null);
        }
    };
    //ticket
    const handleImageChangeTicket = (e) => {
        const file = e.target.files[0];
        if (file) {
            setTicketImages(file);
            setTicketImagesOld(null);
        }
    };
    //policy
    const handleImageChangePolicy = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPolicyImages(file);
            setPolicyImagesOld(null);
        }
    };
    //racekit
    const handleImageChangeRacekit = (e) => {
        const file = e.target.files[0];
        if (file) {
            setRacekitImages(file);
            setRacekitImagesOld(null);
        }
    };
    //schedule
    const handleImageChangeSchedule = (e) => {
        const file = e.target.files[0];
        if (file) {
            setScheduleImages(file);
            setScheduleImagesOld(null);
        }
    };
    //award
    const handleImageChangeAward = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAwardImages(file);
            setAwardImagesOld(null);
        }
    };

    const sortStages = (stages) => {
        return [...stages].sort((a, b) => {
            // So sánh ngày bắt đầu
            const dateA = new Date(a.dateStart);
            const dateB = new Date(b.dateStart);

            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;

            // Nếu ngày bằng nhau thì so sánh cự ly
            const distanceA = parseFloat(a.distance) || 0;
            const distanceB = parseFloat(b.distance) || 0;

            return distanceA - distanceB;
        });
    };

    const formatCurrency = (value) => {
        if (!value) return "";
        return Number(value.toString().replace(/\D/g, "")).toLocaleString("vi-VN");
    };

    useEffect(() => {
        if(usernameContext == null || usernameContext == "" ){
            navigator("/Login");
        }
        fetch(`http://localhost:8080/TicketRunning/admin/eventDetail?id=${idEvent}`, {
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
                setEventName(data.result.name);
                setEventDescription(data.result.description);
                setEventDate(data.result.eventDate);
                setEventLocation(data.result.location);
                setAvatarUrlOld(data.result.avatar);

                const sortedData = sortStages(data.result.listPrice);

                setTicketStages(sortedData);


                if(data.result.price != null) {
                    setTicketImagesOld(data.result.price);
                }
                if(data.result.raceKit != null) {
                    setRacekitImagesOld(data.result.raceKit);
                }
                if(data.result.schedule != null) {
                    setScheduleImagesOld(data.result.schedule);
                }
                if(data.result.policys != null) {
                    setPolicyImagesOld(data.result.policys);
                }
                if(data.result.award != null) {
                    setAwardImagesOld(data.result.award);
                }

            })
            .catch(error => console.error("Lỗi:", error));
            setLoading(false);

    },[idEvent, navigator, tokenContext, usernameContext])

    // Cập nhật thông tin giai đoạn vé
    const handleStageChange = (index, field, value) => {
        const newStages = [...ticketStages];
        newStages[index][field] = field === 'price'
            ? parseFloat(value.replace(/\D/g, '')) || '' // chỉ parseFloat nếu là 'distance'
            : value; // giữ nguyên nếu là 'name'
        setTicketStages(newStages);
    };

    const handleAddStage = () => {
        setTicketStages([...ticketStages, { name: "", distance: "", price: "", dateStart: "", dateFinish: "" }]);
    };

    // Xóa một giai đoạn vé
    const handleRemoveStage = (index) => {
        setTicketStages(ticketStages.filter((_, i) => i !== index));
    };



    // // Gửi dữ liệu lên backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("idEvent",idEvent);
        formData.append("name", eventName);
        formData.append("description", eventDescription);
        formData.append("location", eventLocation);
        formData.append("eventDate", eventDate);
        formData.append("ticketStages", JSON.stringify(ticketStages));
        formData.append("fileAvatar", avatarImage);
        formData.append("priceTicket", ticketImages);
        formData.append("policy", policyImages);
        formData.append("fileAvatar", avatarImage);
        formData.append("sizeChart", racekitImages);
        formData.append("schedule", scheduleImages);
        formData.append("award", awardImages);

        try {
            const response = await fetch(`http://localhost:8080/TicketRunning/admin/editEvent?idAdmin=${idContext}`, {
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
                title: "Chỉnh Sửa Thành Công!",
                icon: "success",
                timer: 2000,
                showConfirmButton: false
            });
            const data = await response.json();
            console.log("Sự kiện được chỉnh sửa thành công!", data);

        } catch (error) {
            console.error("Lỗi khi chỉnh sửa sự kiện:", error);
        }

    };



    return (
        <div className="container ">
            <div className="d-flex mt-1 justify-content-between align-items-center ">
                <IoIosArrowRoundBack onClick={cancelEditEvent} className="cursor-pointer me-3 fs-1"/>
                <h3 className="text-center mb-3" style={{marginRight:"45%"}}>Chỉnh Sửa Sự Kiện</h3>
            </div>
            <form onSubmit={handleSubmit} className="card p-4 shadow overflow-y-auto "
                  style={{height: "80vh", borderRadius: "20px"}}>
                <div className="mb-3">
                    <label className="form-label">Tên sự kiện:</label>
                    <input type="text" className="form-control" value={eventName}
                           onChange={(e) => setEventName(e.target.value)} required/>
                </div>

                <div className="mb-3">
                    <label className="form-label">Mô tả sự kiện:</label>
                    <textarea className="form-control" value={eventDescription}
                              onChange={(e) => setEventDescription(e.target.value)} required/>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Nơi diễn ra:</label>
                        <input type="text" className="form-control" value={eventLocation}
                               onChange={(e) => setEventLocation(e.target.value)} required/>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Ngày diễn ra:</label>
                        <input type="date" className="form-control" value={eventDate}
                               onChange={(e) => setEventDate(e.target.value)} required/>
                    </div>
                </div>
                {/* Upload ảnh Avatar */}
                <div className="mb-3">
                    <label className="form-label">Ảnh Avatar:</label>
                    <input type="file" className="form-control" onChange={handleImageChangeAvatar}/>
                    {avatarImage && (
                        <img
                            src={URL.createObjectURL(avatarImage)}
                            alt="Avatar Preview"
                            className="mt-2"
                            width="100"
                        />
                    )}

                    {!avatarImage && avatarUrlOld && (
                        <img
                            src={avatarUrlOld}
                            alt="Avatar Preview"
                            className="mt-2"
                            width="100"
                        />
                    )}
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
                            <input type="text" className=" form-control mb-2" placeholder="Giá vé"
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
                <div className="mb-3">
                    <label className="form-label">Ảnh Giá Vé:</label>
                    <input type="file" className="form-control" onChange={handleImageChangeTicket}/>

                    {(ticketImages || ticketImagesOld) && (
                        <div className="mt-2 position-relative">
                            <img
                                src={ticketImages ? URL.createObjectURL(ticketImages) : ticketImagesOld}
                                alt="Preview"
                                className="border rounded"
                                width="100"
                                height="100"
                            />
                            <button
                                type="button"
                                className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                onClick={() => {
                                    setTicketImages(null);
                                    setTicketImagesOld(null);
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Ảnh Lich Trình :</label>
                    <input type="file" className="form-control" onChange={handleImageChangeSchedule}/>

                    {(scheduleImages || scheduleImagesOld) && (
                        <div className="mt-2 position-relative">
                            <img
                                src={scheduleImages ? URL.createObjectURL(scheduleImages) : scheduleImagesOld}
                                alt="Preview"
                                className="border rounded"
                                width="100"
                                height="100"
                            />
                            <button
                                type="button"
                                className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                onClick={() => {
                                    setScheduleImages(null);
                                    setScheduleImagesOld(null);
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Ảnh RaceKit:</label>
                    <input type="file" className="form-control" onChange={handleImageChangeRacekit}/>

                    {(racekitImages || racekitImagesOld) && (
                        <div className="mt-2 position-relative">
                            <img
                                src={racekitImages ? URL.createObjectURL(racekitImages) : racekitImagesOld}
                                alt="Preview"
                                className="border rounded"
                                width="100"
                                height="100"
                            />
                            <button
                                type="button"
                                className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                onClick={() => {
                                    setRacekitImages(null);
                                    setRacekitImagesOld(null);
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Ảnh Chính Sách:</label>
                    <input type="file" className="form-control" onChange={handleImageChangePolicy}/>

                    {(policyImages || policyImagesOld) && (
                        <div className="mt-2 position-relative">
                            <img
                                src={policyImages ? URL.createObjectURL(policyImages) : policyImagesOld}
                                alt="Preview"
                                className="border rounded"
                                width="100"
                                height="100"
                            />
                            <button
                                type="button"
                                className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                onClick={() => {
                                    setPolicyImages(null);
                                    setPolicyImagesOld(null);
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>

                <div className="mb-3">
                    <label className="form-label">Ảnh Giải Thưởng:</label>
                    <input type="file" className="form-control" onChange={handleImageChangeAward}/>

                    {(awardImages || awardImagesOld) && (
                        <div className="mt-2 position-relative">
                            <img
                                src={awardImages ? URL.createObjectURL(awardImages) : awardImagesOld}
                                alt="Preview"
                                className="border rounded"
                                width="100"
                                height="100"
                            />
                            <button
                                type="button"
                                className="btn btn-danger btn-sm position-absolute top-0 end-0"
                                onClick={() => {
                                    setAwardImages(null);
                                    setAwardImagesOld(null);
                                }}
                            >
                                ✕
                            </button>
                        </div>
                    )}
                </div>


                <button type="submit" className="buttonCreate btn btn-primary w-100"
                        disabled={ticketStages.length === 0}>Lưu Chỉnh Sửa
                </button>
            </form>
            {loading && (<Loading/>)}
        </div>
    );
};

export default PopUpEditEvent;
