import {useEffect, useState} from "react";
import axios from "axios";
import Chat from "./Chat";

function MessageHome() {
    const [users, setUsers] = useState([]);
    const userIdSend = localStorage.getItem("id");
    const userEmailSend = localStorage.getItem("email");
    const userNameSend = localStorage.getItem("name");
    const [targetUserId, setTargetUserId] = useState(null);
    const [userNameTo,setUserNameTo] = useState(null);


    // Load ds user để chat
    useEffect(() => {
        axios.get(`http://localhost:8080/user/userListNotIn?userIdSend=${userIdSend}`)
            .then(res => setUsers(res.data.result));
        console.log(userIdSend);
    }, [userIdSend]);
    return (

        <div className="flex h-screen">
            {/* Cột bên trái */}
            <div className="w-1/4 border-r p-4">
                    <div className="mb-6 flex items-center space-x-3">

                        <span className="font-bold fs-5 fw-bold">{userNameSend}</span>
                    </div>
                <h3 className="font-semibold mb-2">Danh sách bạn bè</h3>
                <ul className="space-y-3">
                    {users.map((u) => (
                        <li
                            key={u.id}
                            onClick={() => {setTargetUserId(u.id);setUserNameTo(u.name)}}
                            className="flex items-center space-x-3 p-2 rounded cursor-pointer hover:bg-gray-200"
                        >
                            <img
                                src={"https://i.pravatar.cc/50?img=2"}
                                alt={u.name}
                                className="w-10 h-10 rounded-full"
                            />
                            <span>{u.name}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Cột bên phải */}
            <div className="w-2/4 p-4">
                {targetUserId ? (
                    <Chat targetUserId={targetUserId} userNameTo={userNameTo}/>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                        <p>Chọn một user để bắt đầu chat</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MessageHome;
