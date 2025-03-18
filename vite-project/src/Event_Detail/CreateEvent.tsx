import { useState } from "react";
import axios from "axios";

const CreateEvent = () => {
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventName, setEventName] = useState("");

    const [eventDate, setEventDate] = useState("");
    const [ticketStages, setTicketStages] = useState([]);

    // Thêm một giai đoạn vé mới
    const handleAddStage = () => {
        setTicketStages([...ticketStages, { stageName: "", price: "", startDate: "", endDate: "" }]);
    };

    // Xóa một giai đoạn vé
    const handleRemoveStage = (index) => {
        setTicketStages(ticketStages.filter((_, i) => i !== index));
    };

    // Cập nhật thông tin giai đoạn vé
    const handleStageChange = (index, field, value) => {
        const newStages = [...ticketStages];
        newStages[index][field] = value;
        setTicketStages(newStages);
    };

    // Gửi dữ liệu lên server
    const handleSubmit = async (event) => {
        event.preventDefault();

        const requestData = {
            eventName,
            eventDescription,
            eventDate,
            ticketStages
        };

        try {
            const response = await axios.post("http://localhost:8080/api/events/create", requestData);
            console.log("Sự kiện được tạo thành công!", response.data);
        } catch (error) {
            console.error("Lỗi khi tạo sự kiện:", error);
        }
    };


    const [avatarImage, setAvatarImage] = useState(null);
    const [ticketImages, setTicketImages] = useState([]);
    const [sizeImages, setSizeImages] = useState([]);
    const [policyImages, setPolicyImages] = useState([]);
    const [racekitImages, setRacekitImages] = useState([]);

    const handleImageChange = (event, setImageState, multiple = false) => {
        const files = event.target.files;
        if (files) {
            const fileArray = Array.from(files);
            setImageState(multiple ? (prev) => [...prev, ...fileArray] : fileArray[0]);
        }
    };

    const handleRemoveImage = (index, setImageState) => {
        setImageState((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit2 = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        // Thông tin sự kiện
        formData.append("eventName", "Giải chạy mùa hè");
        formData.append("eventDescription", "Giải chạy thú vị với nhiều phần thưởng!");

        // Avatar (chỉ 1 ảnh)
        if (avatarImage) formData.append("avatarImage", avatarImage);

        // Ảnh khác (dạng mảng)
        ticketImages.forEach((image) => formData.append("ticketImages", image));
        sizeImages.forEach((image) => formData.append("sizeImages", image));
        policyImages.forEach((image) => formData.append("policyImages", image));
        racekitImages.forEach((image) => formData.append("racekitImages", image));

        // try {
        //     const response = await axios.post("http://localhost:8080/api/events/create", formData, {
        //         headers: { "Content-Type": "multipart/form-data" },
        //     });
        //     console.log("Sự kiện được tạo thành công!", response.data);
        // } catch (error) {
        //     console.error("Lỗi khi tạo sự kiện:", error);
        // }
    };

    return (
        <div style={{marginTop: "100px"}}>
            <h2>Tạo sự kiện</h2>
            <form onSubmit={handleSubmit}>
                <label>Tên sự kiện:</label>
                <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} required/>

                <label>Mô tả sự kiện:</label>
                <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} required/>

                <lable>Nơi diễn ra sự kiện:</lable>
                <textarea></textarea>

                <label>Ngày diễn ra:</label>
                <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required/>

                <h3>Giai đoạn bán vé:</h3>
                {ticketStages.map((stage, index) => (
                    <div key={index} style={{border: "1px solid #ccc", padding: "10px", marginBottom: "10px"}}>
                        <label>Tên giai đoạn:</label>
                        <input
                            type="text"
                            value={stage.stageName}
                            onChange={(e) => handleStageChange(index, "stageName", e.target.value)}
                            required
                        />

                        <label>Giá vé:</label>
                        <input
                            type="number"
                            value={stage.price}
                            onChange={(e) => handleStageChange(index, "price", e.target.value)}
                            required
                        />

                        <label>Ngày bắt đầu:</label>
                        <input
                            type="date"
                            value={stage.startDate}
                            onChange={(e) => handleStageChange(index, "startDate", e.target.value)}
                            required
                        />

                        <label>Ngày kết thúc:</label>
                        <input
                            type="date"
                            value={stage.endDate}
                            onChange={(e) => handleStageChange(index, "endDate", e.target.value)}
                            required
                        />

                        <button type="button" onClick={() => handleRemoveStage(index)}>Xóa</button>
                    </div>
                ))}

                <button type="button" onClick={handleAddStage}>+ Thêm giai đoạn</button>
                <br/>
                <button type="submit">Tạo sự kiện</button>
            </form>
            <form onSubmit={handleSubmit}>
                {/* Avatar */}
                <input type="file" onChange={(e) => handleImageChange(e, setAvatarImage)}/>
                {avatarImage && (
                    <div>
                        <img src={URL.createObjectURL(avatarImage)} width="100" height="100"/>
                    </div>
                )}

                {/* Ảnh giá vé */}
                <input type="file" multiple onChange={(e) => handleImageChange(e, setTicketImages, true)}/>
                {ticketImages.map((image, index) => (
                    <div key={index}>
                        <img src={URL.createObjectURL(image)} width="100" height="100"/>
                        <button type="button" onClick={() => handleRemoveImage(index, setTicketImages)}>Xóa</button>
                    </div>
                ))}

                {/* Ảnh size áo */}
                <input type="file" multiple onChange={(e) => handleImageChange(e, setSizeImages, true)}/>
                {sizeImages.map((image, index) => (
                    <div key={index}>
                        <img src={URL.createObjectURL(image)} width="100" height="100"/>
                        <button type="button" onClick={() => handleRemoveImage(index, setSizeImages)}>Xóa</button>
                    </div>
                ))}

                <button type="submit">Tạo sự kiện</button>
            </form>
        </div>
    );
};
export default CreateEvent;
