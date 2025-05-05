import { useState } from "react";
import "./FilterSidebar.css";
import {useLocation} from "react-router-dom"; // Import CSS tùy chỉnh

const FilterSidebar = ({ isOpen, onClose , sendDataToParent ,cancel }: { isOpen: boolean; onClose: () => void ;  sendDataToParent: (data: []) => void; cancel: (value: boolean) => void }) => {
    const [selectedMonth, setSelectedMonth] = useState(0);
    const [price, setPrice] = useState<number>(0);
    const months = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`);
    const location = useLocation();


    const filterButton = async () => {
        try {
            const response = await fetch(`http://localhost:8080/TicketRunning/event/filter?month=${selectedMonth}&priceFilter=${price}`,{
                method:"GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Lỗi khi lấy dữ liệu!");
            }
            const data = await response.json();
            sendDataToParent(data.result);
        } catch (error) {
            console.error("Lỗi:", error);
        }
        console.log(location.pathname);
    }
    const cancelButton = () => {
        cancel(true);
    };

    return (
        <div className={`filter-sidebar ${isOpen ? "open" : ""}`}>
            <div className="filter-header d-flex justify-content-between align-items-center p-3 border-bottom">
                <h5 className="m-0">Bộ lọc</h5>
                <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="filter-body p-3">
                {/* Bộ lọc thời gian */}
                <h6 className="mb-2">Thời gian</h6>
                <div className="row g-2">
                    {months.map((month, index) => (
                        <div className="col-4" key={index}>
                            <button
                                className={`btn btn-sm btn-outline-primary w-100 ${
                                    selectedMonth === index + 1 ? "active" : ""
                                }`}
                                onClick={() => setSelectedMonth(index + 1)}
                            >
                                {month}
                            </button>
                        </div>
                    ))}
                </div>

                {/* Bộ lọc giá bán */}
                <h6 className="mt-4 mb-2">Giá bán</h6>
                <input
                    type="range"
                    className="form-range"
                    min="199999"
                    max="3000000"
                    step="10000"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                />
                <p className="text-muted">Giá: {price.toLocaleString()} đ</p>

                {/* Nút thao tác */}
                <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-outline-secondary w-50 me-2" onClick={() => { setSelectedMonth(0); setPrice(0); cancelButton()}}>
                        Xóa bộ lọc
                    </button>
                    <button className="btn btn-primary w-50" onClick={filterButton}>Lọc kết quả</button>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
