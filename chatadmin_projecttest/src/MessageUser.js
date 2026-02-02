import React, {useEffect, useRef, useState} from "react";
import { FaPlusCircle } from "react-icons/fa";
import {Button} from "react-bootstrap";
import {MdCancel} from "react-icons/md";
import axios from "axios";
import SockJS from "sockjs-client";
import {Client} from "@stomp/stompjs";

function MessageUser() {
    const [messages, setMessages] = useState([]);
    const userIdSend = localStorage.getItem("id");
    const userEmailSend = localStorage.getItem("email");
    const [input, setInput] = useState("");

    const token = localStorage.getItem("token");
    const idAdmin = 6;
    const [openWindows, setOpenWindows] = useState(true);

    const [stompClient, setStompClient] = useState(null);
    const [connected,setConnected] =useState(false);


    const chatRef = useRef(null);

    // Load lịch sử tin nhắn khi mở phòng
    useEffect(() => {
        axios.get(`http://localhost:8085/message/messageHistory?idUserSend=${userIdSend}&&idUserTo=${idAdmin}`,
            {
                headers:{
                  Authorization:`Bearer ${token}`
                },
            }
            )
            .then(res =>  {setMessages(res.data.result);console.log(res.data.result);});


    }, [userIdSend, idAdmin, token]);




    // Kết nối WebSocket
    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8085/ws"), // ✅ ĐÚNG
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            onConnect: () => {
                console.log("✅ STOMP CONNECTED");

                client.subscribe("/user/queue/messages", (msg) => {
                    const body = JSON.parse(msg.body);
                    setMessages(prev => [...prev, body]);
                });

                setConnected(true); // bạn nên có 1 state connected
            },
            onStompError: (frame) => {
                console.error("❌ STOMP Error", frame);
            },
        });

        client.activate();
        setStompClient(client);

        return () => {
            client.deactivate();
        };
    }, [idAdmin, userIdSend]);


    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);
    const sendMessage = () => {
        if (!input.trim()) return;
        stompClient.publish({
            destination: "/app/chat.private",
            body: JSON.stringify({
                userIdSend: userIdSend,
                userIdTo: idAdmin,
                content: input,
            }),
        });

        setMessages(prev => [
            ...prev,
            { userIdSend: userIdSend, userIdTo: idAdmin, content: input }
        ]);
        setInput("");
    };
    return (
        <div className={"bg-dark"}>
            {/*Button open windows chat with admin*/}
            {openWindows ? <div>
                <Button onClick={() => setOpenWindows(false)} className={"fs-1 position-fixed bottom-0 end-0 m-3"}>
                    <FaPlusCircle/>
                </Button>
            </div>
                :
                //Windows chat with admin
                <div className={"w-25 h-50 position-fixed bottom-0 end-0 m-3 mb-5"}>
                    <div className={"py-3 bg-secondary rounded-top d-flex"}>
                        <p className={"text-white fs-5 ms-3 mb-0"}>Contact Admin</p>
                        <MdCancel className={"position-fixed end-0 me-4 text-white "} style={{cursor:"pointer"}} onClick={() => setOpenWindows(true)} />
                    </div>
                    <div className={"h-100 bg-light"}>
                        <div ref={chatRef}
                             style={{height: "85%", overflowY: "scroll", border: "1px solid gray", marginBottom: 10}}>
                            {messages.map((m, i) => (
                                <div key={i} style={{textAlign: m.userIdSend === userIdSend ? "right" : "left"}}>
                                    <b>{m.userIdSend === userIdSend ? "You" : "Admin"}:</b> {m.content}
                                </div>
                            ))}
                        </div>
                        <input
                            value={input}
                            style={{width:"88%"}}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                </div>}
        </div>
    );
}

export default MessageUser;
