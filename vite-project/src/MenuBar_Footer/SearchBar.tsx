import { useEffect, useState } from "react";
import { FaFlag, FaSearch } from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import "./SearchBar.css";

const SearchBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);

    useEffect(() => {
        const currentDate = new Date();
        setSelectedMonth(currentDate.getMonth() + 1); // Lấy tháng hiện tại
        setSelectedYear(currentDate.getFullYear()); // Lấy năm hiện tại
    }, []);

    const months = [
        "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4",
        "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8",
        "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12",
    ];

    const handleSelectMonth = (index) => {
        setSelectedMonth(index + 1);
        setIsOpen(false);
    };

    return (
        <div className="search-container">
            <div className="input-group rounded shadow-sm">
                <span className="input-group-text"><FaFlag/></span>
                <input type="text" placeholder="Nhập địa điểm hoặc sự kiện" className="form-control border-0" />
                <span className="input-group-text cursor-pointer" onClick={() => setIsOpen(true)}>
                    <IoCalendarOutline className="me-1"/>
                    {selectedMonth ? `Tháng ${selectedMonth}/${selectedYear}` : "Thời gian"}
                </span>
                <button className="btn btn-primary"><FaSearch/></button>
            </div>

            {isOpen && <div className="overlay" onClick={() => setIsOpen(false)}></div>}

            {isOpen && (
                <div className="month-picker">
                    <div className="d-flex justify-content-between align-items-center p-2">
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => setSelectedYear(selectedYear - 1)}>{"<"}</button>
                        <span className="fw-bold">{selectedYear}</span>
                        <button className="btn btn-sm btn-outline-secondary" onClick={() => setSelectedYear(selectedYear + 1)}>{">"}</button>
                    </div>
                    <div className="row g-1">
                        {months.map((month, index) => (
                            <div className="col-4" key={index}>
                                <button
                                    className={`btn w-100 btn-sm ${
                                        selectedMonth === index + 1 ? "btn-warning text-white" : "btn-outline-secondary"
                                    }`}
                                    onClick={() => handleSelectMonth(index)}
                                >
                                    {month}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
