import {useNavigate, useSearchParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../Context/AuthContext.tsx";
import Swal from "sweetalert2";
import Loading from "./Loading.tsx";

const LoadingPayment = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { tokenContext } = useContext(AuthContext);

    const responseCode = searchParams.get('vnp_ResponseCode');
    const idCI = searchParams.get('vnp_OrderInfo');
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        if (responseCode === '00') {
            fetch(`http://localhost:8080/TicketRunning/Event/Payment/vn-pay-callback?customerInformationID=${idCI}&status=${responseCode}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' ,
                    "Authorization": `Bearer ${tokenContext}`
                },
            })
                .then(async res => {
                    if (!res.ok) {
                        const errorText = await res.text();
                        throw new Error(`Lỗi từ server: ${res.status} - ${errorText}`);
                    }
                    const contentType = res.headers.get("content-type");
                    if (contentType && contentType.includes("application/json")) {
                        return res.json();
                    } else {
                        throw new Error("Phản hồi không phải JSON hợp lệ");
                        setLoading(false);

                    }
                })
                .then(data => {
                    if (data.result.message == "Success") {
                        setLoading(false);
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Thanh Toán Thành Công!",
                            showConfirmButton: false,
                            timer: 1500
                        });setTimeout(() => {
                            navigate(`/`);
                        }, 1500);
                    } else {
                        setLoading(false);
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Thanh Toán Thất Bại!",
                            showConfirmButton: false,
                            timer: 1500
                        });setTimeout(() => {
                            navigate(`/`);
                        }, 1500);
                    }
                })

        } else {
            setLoading(false);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Thanh Toán Thất Bại!",
                showConfirmButton: false,
                timer: 1500});
            setTimeout(() => {
                navigate(`/`);
            }, 1500);
        }
    }, [responseCode, idCI, navigate, tokenContext]);

    return (

        <div style={{marginTop:"100px"}}>
            <Loading/>
        </div>
    )
}
export default LoadingPayment;
