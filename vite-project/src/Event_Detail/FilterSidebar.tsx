import { useState } from "react";
import "./FilterSidebar.css"; // Import CSS tùy chỉnh

const FilterSidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [status, setStatus] = useState<string[]>([]); // trạng thái trong filter
    const [price, setPrice] = useState<number>(0);

    const months = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`);

    const handleStatusChange = (value: string) => {
        setStatus((prev) =>
            prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
        );
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

                {/* Bộ lọc trạng thái */}
                <h6 className="mt-4 mb-2">Trạng thái</h6>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="status1"
                        checked={status.includes("Sắp mở bán")}
                        onChange={() => handleStatusChange("Sắp mở bán")}
                    />
                    <label className="form-check-label" htmlFor="status1">
                        Sắp mở bán
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="status2"
                        checked={status.includes("Đang mở bán")}
                        onChange={() => handleStatusChange("Đang mở bán")}
                    />
                    <label className="form-check-label" htmlFor="status2">
                        Đang mở bán
                    </label>
                </div>
                <div className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="status3"
                        checked={status.includes("Đã hết thời gian mở bán")}
                        onChange={() => handleStatusChange("Đã hết thời gian mở bán")}
                    />
                    <label className="form-check-label" htmlFor="status3">
                        Đã hết thời gian mở bán
                    </label>
                </div>

                {/* Bộ lọc giá bán */}
                <h6 className="mt-4 mb-2">Giá bán</h6>
                <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="1000000"
                    step="10000"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                />
                <p className="text-muted">Giá: {price.toLocaleString()} đ</p>

                {/* Nút thao tác */}
                <div className="d-flex justify-content-between mt-4">
                    <button className="btn btn-outline-secondary w-50 me-2" onClick={() => { setSelectedMonth(null); setStatus([]); setPrice(0); }}>
                        Xóa bộ lọc
                    </button>
                    <button className="btn btn-primary w-50">Lọc kết quả</button>
                </div>
            </div>
        </div>
    );
};

export default FilterSidebar;
