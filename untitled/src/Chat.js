
    import React, {useState, useEffect, useRef} from "react";
    import axios from "axios";
    import SockJS from "sockjs-client";
    import { Client } from "@stomp/stompjs";

    const Chat = ({ targetUserId ,userNameTo }) => {
        const [messages, setMessages] = useState([]);
        const [input, setInput] = useState("");
        const [stompClient, setStompClient] = useState(null);
        const userIdSend = localStorage.getItem("id");

        // Load lịch sử tin nhắn khi mở phòng
        useEffect(() => {
            axios.get(`http://localhost:8080/message/messageList?userIdSend=${userIdSend}&&userIdTo=${targetUserId}`)
                .then(res =>  {setMessages(res.data.result);console.log(res.data.result);});

        }, [userIdSend, targetUserId ]);

        // Kết nối WebSocket
        useEffect(() => {
            const socket = new SockJS("http://localhost:8080/ws");
            const client = new Client({
                webSocketFactory: () => socket,
                connectHeaders: {
                    userIdSent: userIdSend, // chính là ID bạn lưu
                },
                onConnect: () => {
                    client.subscribe("/user/queue/messages", (msg) => {
                        const body = JSON.parse(msg.body);

                        {
                            setMessages((prev) => [...prev, body]); // Giúp cập nhật ngay lên mh
                        }
                    });
                },
            });
            client.activate();
            setStompClient(client);

            return () => {
                client.deactivate(); // cleanup khi component unmount
            };
        }, [targetUserId, userIdSend]); // thêm dependency để lắng nghe đúng người


        // Gửi tin nhắn
        const sendMessage = () => {
            if (!input.trim()) return;
            stompClient.publish({
                destination: "/app/chat.private",
                body: JSON.stringify({
                    userIdSent: userIdSend,
                    userIdTo: targetUserId,
                    content: input,
                }),
            });

            setMessages(prev => [
                ...prev,
                { userIdSent: userIdSend, userIdTo: targetUserId, content: input }
            ]);
            setInput("");
        };
        const chatRef = useRef(null);
        useEffect(() => {
            if (chatRef.current) {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            }
        }, [messages]);

        return (
            <div>
                <h3>Chat with {userNameTo}</h3>
                <div ref={chatRef}  style={{ height: 250, overflowY: "scroll", border: "1px solid gray", marginBottom: 10 }}>
                    {messages.map((m, i) => (
                        <div key={i} style={{ textAlign: m.userIdSent === userIdSend ? "right" : "left" }}>
                            <b>{m.userIdSent === userIdSend ? "You" : userNameTo}:</b> {m.content}
                        </div>
                    ))}
                </div>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        );
    };
    export default Chat;

