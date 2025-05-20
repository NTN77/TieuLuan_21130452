import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import SignIn from "./Login/SignIn.tsx";
import Admin from "./Admin/Admin.tsx";
import Menubar from "./MenuBar_Footer/MenuBar.tsx";
import Footer from "./MenuBar_Footer/Footer.tsx";
import {GoogleOAuthProvider} from "@react-oauth/google";
import Event_List from "./EventList/Event_List.tsx";
import CreateEvent from "./Admin/EventManager/CreateEvent.tsx";
import Event_Search from "./SupportTool/Event_Search.tsx";
import Event_Detail from "./Event_Detail/Event_Detail.tsx";
import Information_SignUp from "./Payment/Information_SignUp.tsx";
import LoadingPayment from "./Payment/LoadingPayment.tsx";
import MyTicket from "./MyTicket/MyTicket.tsx";
import Support from "./PageSupport/Support.tsx";
import NewsHome from "./News/NewsHome.tsx";
import NewsDetail from "./News/NewsDetail.tsx";

function App() {
    const location = useLocation();
    const showMenubar = location.pathname !== "/Login" && location.pathname !== "/SignIn" && location.pathname !== "/Admin/createEvent" && location.pathname !== "/Admin";
    const showFooter = location.pathname !== "/Login" && location.pathname !== "/SignIn" && location.pathname !== "/Admin/createEvent" && location.pathname !== "/Admin" && location.pathname !== "/News" && !location.pathname.startsWith("/News/");;

    return (
        <GoogleOAuthProvider clientId="697065721574-jb6163gmpmhn607933dgvmbettr2c2fj.apps.googleusercontent.com">
        <div >

            {showMenubar && <Menubar/>}
            <Routes>
                {/*Trang User*/}
                <Route path="/" element={<Home />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/Event" element={<Event_List />} />
                <Route path="/searchEvent" element={<Event_Search/>} />
                <Route path="/Event/detailEvent/:id" element={<Event_Detail/>} />
                <Route path="/Event/payment/:id" element={<Information_SignUp/>}/>
                <Route path="/Event/PaymentResult" element={<LoadingPayment/>}/>
                <Route path="/support" element={<Support/>}/>
                <Route path="/myticket" element={<MyTicket/>}/>
                <Route path="/News" element={<NewsHome />}/>
                <Route path="/News/:id" element={<NewsDetail />} />


                {/*Admin*/}
                <Route path="/Admin" element={<Admin/>} />
                <Route path="/Admin/createEvent" element={<CreateEvent/>} />
            </Routes>
            {showFooter && <Footer/>}
        </div>
    </GoogleOAuthProvider>

);
}

export default App;
