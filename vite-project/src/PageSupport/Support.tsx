import {FaFileAlt} from "react-icons/fa";
import "./Support.css"
import {useState} from "react";
import PopUpInformation from "./PopUpInformation.tsx";
import PopUpSignUpEvent from "./PopUpSignUpEvent.tsx";
import PopUpInforTicket from "./PopUpInforTicket.tsx";
import PopUpEmailConfirm from "./PopUpEmailConfirm.tsx";
const Support = () => {
    const [board,setBoard] = useState(true);
    const [signUp,setSignUp] = useState(false);
    const [signUpEvent,setSignUpEvent] = useState(false);
    const [inforTicket,setInforTicket] = useState(false);
    const [emailConfirm,setEmailConfirm] = useState(false);


    const cancel = () => {
        setBoard(true);
        setSignUp(false);
        setInforTicket(false);
        setEmailConfirm(false);
        setSignUpEvent(false);
    }
    const buttonSignUpSP = () => {
        setBoard(false);
        setSignUp(true);
        setInforTicket(false);
        setEmailConfirm(false);
        setSignUpEvent(false);
    }
    const buttonSignUpTicketSP = () => {
        setBoard(false);
        setSignUp(false);
        setInforTicket(false);
        setEmailConfirm(false);
        setSignUpEvent(true);
    }
    const buttonInforTicketSP = () => {
        setBoard(false);
        setSignUp(false);
        setInforTicket(true);
        setEmailConfirm(false);
        setSignUpEvent(false);
    }
    const buttonEmailConfirm = () => {
        setBoard(false);
        setSignUp(false);
        setInforTicket(false);
        setEmailConfirm(true);
        setSignUpEvent(false);
    }
    return(
       <div style={{marginTop: "90px"}}>
           {board && (
               <div >
                   <p className={" d-flex justify-content-center fs-3"}>Xin chào bạn, Tôi có thể giúp gì cho bạn?</p>
                   <p className={"d-flex justify-content-center fst-italic"}>Bạn có thể liên hệ qua email để được giải
                       đáp rõ ràng hơn!
                       Email: <strong className={"text-danger"}>support@NTNRunning.net</strong></p>
                   <div className={"containerSupport justify-content-center"}>
                       <div className={"box accountInformation"}>
                           <button onClick={buttonSignUpSP}><FaFileAlt/>
                               <p>ĐĂNG KÝ TÀI KHOẢN</p>
                           </button>
                       </div>
                       <div className={"box signUpEvent"}>
                           <button onClick={buttonSignUpTicketSP}><FaFileAlt/>
                               <p>ĐĂNG KÝ SỰ KIỆN</p>
                           </button>
                       </div>
                       <div className={"box ticketInformation"}>
                           <button onClick={buttonInforTicketSP}><FaFileAlt/>
                               <p>THÔNG TIN VÉ</p>
                           </button>
                       </div>
                       <div className={"box emailConfirm"}>
                           <button onClick={buttonEmailConfirm}><FaFileAlt/>
                               <p>EMAIL XÁC NHẬN</p>
                           </button>
                       </div>
                   </div>
               </div>
           )}
           {signUp && (
               <PopUpInformation cancel={cancel}/>
           )}
           {signUpEvent && (
               <PopUpSignUpEvent cancel={cancel}/>
           )}
           {inforTicket && (
               <PopUpInforTicket cancel={cancel}/>
           )}
           {emailConfirm && (
               <PopUpEmailConfirm cancel={cancel}/>
           )}
       </div>
    )
}
export default Support;
