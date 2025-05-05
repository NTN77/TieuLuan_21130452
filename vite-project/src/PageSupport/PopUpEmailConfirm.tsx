import {IoMdArrowRoundBack} from "react-icons/io";

const PopUpEmailConfirm = ({cancel}) => {
    return (
        <div className={"containerScreen pb-5"}>
            <div className={"containerSPInformation w-75 mx-auto"}>
                <div className={"d-flex"}>
                    <button onClick={cancel}><IoMdArrowRoundBack className={"fs-1"}/></button>
                    <h3 className={"d-flex mx-auto"}>CHƯA NHẬN ĐƯỢC EMAIL XÁC NHẬN THANH TOÁN THÀNH CÔNG</h3>
                </div>
                <div>
                    <p>Bạn vui lòng cung cấp thông tin bao gồm: Họ và tên, số điện thoại, CCCD/CMND, tên sự kiện và liên hệ với chúng tôi qua:</p>
                    <p>Email:<strong> support@NTNRunning.net</strong> hoặc hotline: <strong>19007777</strong></p>
                </div>
            </div>
        </div>
    )
}
export default PopUpEmailConfirm;
