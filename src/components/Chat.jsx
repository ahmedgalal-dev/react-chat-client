import React, { useState, useEffect } from "react";
const username = "User" + Math.floor(Math.random() * 1000);

const Chat = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        const ws = new WebSocket("wss://marvelous-momentous-hardware.glitch.me/");
        setSocket(ws);

        ws.onmessage = async (event) => {
            const newMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        return () => ws.close();
    }, []);

    const sendMessage = () => {
        if (socket && input.trim() !== "") {
            const message = {
                username,
                input
            }
            socket.send(JSON.stringify(message));
            setInput("");
        }
    };

    return (
        <div className="bg-zinc-800  flex flex-col items-center gap-3 min-h-full h-fit">
            <div className="w-full flex flex-col items-center">
                <div className="flex-col items-start w-full">
                    <h1 className="text-3xl text-white text-left font-bold p-2">
                        Chat App!
                    </h1>

                </div>
                <div className="w-10/12  flex flex-col gap-2 justify-end rounded-md p-1">
                    {(messages.length === 0) ?
                        <p className="bg-transparent text-center text-white p-5 w-full">No messages yet, start the conversation</p>
                        : messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.username === username ? "justify-start" : "justify-end"} text-white`}>
                                <div className="flex flex-col w-full ">
                                    <strong key={index + 1} className={`${msg.username === username ? "text-left" : "text-right"}`}>
                                        {msg.username === username ? `me` : msg.username}
                                    </strong>
                                    <div className={`${msg.username === username ? "text-left" : "text-right"}`}>
                                        <p
                                            className="bg-zinc-700 text-white break-words w-full p-2 rounded-md"
                                            key={index + 2}>{msg.input}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}

                </div>
            </div>
            <div className="flex flex-row shadow-md bg-zinc-700 p-2 mb-1 rounded-lg shadow-gray-70 fixed bottom-2 w-10/12">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="bg-transparent flex-grow w-full text-white  outline-none"
                    onKeyDown={(e) => { if (e.key === "Enter") sendMessage() }}
                />
                <button className="p-2 ml-1 bg-zinc-800 text-white rounded-md hover:border-transparent" onClick={sendMessage}>Send</button>
            </div>
        </div >
    );
};

export default Chat;
