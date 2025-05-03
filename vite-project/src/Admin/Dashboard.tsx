import React, { useContext, useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
    LineChart, Line, ResponsiveContainer
} from "recharts";
import { AuthContext } from "../Context/AuthContext";

interface SignUpData {
    month: string;
    number: number;
}

interface RevenueData {
    month: string;
    value: number;
}

const Dashboard = () => {
    const [signUpMonth, setSignUpMonth] = useState<SignUpData[]>([]);
    const [revenueMonth, setRevenueMonth] = useState<RevenueData[]>([]);
    const [eventOrganizeMonth, setEventOrganizeMonth] = useState<RevenueData[]>([]);

    const { tokenContext } = useContext(AuthContext);

    useEffect(() => {
        fetch(`http://localhost:8080/TicketRunning/admin/dashboard/dataDashBoard`, {
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
                setSignUpMonth(data.result.dataMonthList);
                setRevenueMonth(data.result.revenueByMonths);
                setEventOrganizeMonth(data.result.dataEvents);
            })
            .catch(error => console.error("Lỗi:", error));
    }, [tokenContext]);

    // Tooltip tùy chỉnh cho BarChart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: 10 }}>
                    <p><strong>Tháng {label}</strong></p>
                    <p>Số lượng đăng ký: {payload[0].value}</p>
                </div>
            );
        }
        return null;
    };

    const CustomTooltipEvent = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: 10 }}>
                    <p><strong>Tháng {label}</strong></p>
                    <p>Số lượng sự kiện: {payload[0].value}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className={"mt-3"}>
            <div className={"d-flex"}>
                <BarChart width={500} height={300} data={signUpMonth}>
                    <CartesianGrid strokeDasharray="3 1"/>
                    <XAxis dataKey="month" tickFormatter={(month) => `Tháng ${month}`}/>
                    <YAxis label={{value: 'Số lượng đăng ký', angle: -90, position: 'insideLeft'}}/>
                    <Tooltip content={<CustomTooltip/>}/>
                    <Legend formatter={(value) => value === 'number' ? 'Tổng số lượng đăng ký theo tháng' : value}/>
                    <Bar dataKey="number" fill="#8884d8"/>
                </BarChart>
               <div className={"ms-5"}>
                   <BarChart width={500} height={300} data={eventOrganizeMonth}>
                       <CartesianGrid strokeDasharray="3 1"/>
                       <XAxis dataKey="month" tickFormatter={(month) => `Tháng ${month}`}/>
                       <YAxis label={{value: 'Số lượng sự kiện', angle: -90, position: 'insideLeft'}}/>
                       <Tooltip content={<CustomTooltipEvent/>}/>
                       <Legend formatter={(value) => value === 'number' ? 'Tổng số sự kiện diễn ra theo tháng' : value}/>
                       <Bar dataKey="number" fill="#8884d8"/>
                   </BarChart>
               </div>
            </div>
            <div style={{width: "100%", height: 250}}>
                <ResponsiveContainer>
                    <LineChart data={revenueMonth} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="month" tickFormatter={(month) => `Tháng ${month}`}/>
                        <YAxis/>
                        <Tooltip
                            formatter={(value: number) =>
                                [`${value.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}`, 'Tổng doanh thu']
                            }
                            labelFormatter={(label: number) => `Tháng ${label}`}
                        />

                        <Legend formatter={() => "Tổng doanh thu"} />
                        <Line type="monotone" dataKey="totalRevenue" stroke="#82ca9d" strokeWidth={2}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Dashboard;
