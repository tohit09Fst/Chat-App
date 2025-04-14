import React, { useEffect, useState } from 'react';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import socketIo from "socket.io-client";
import { user } from './Join';
import Message from './Message';


let socket;
const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
    const [id, setid] = useState("");
    const [messages, setMessages] = useState([]);

    const send = () => {
        const message = document.getElementById('chatInput').value;
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = "";
    }; 

    useEffect(() => {
        socket = socketIo(ENDPOINT, { transports: ['websocket'] });

        socket.on('connect', () => {
            alert('Connected');
            setid(socket.id);
        });

        socket.emit('joined', { user });

        socket.on('welcome', (data) => {
            setMessages(prev => [...prev, data]);
        });

        socket.on('userJoined', (data) => {
            setMessages(prev => [...prev, data]);
        });

        socket.on('leave', (data) => {
            setMessages(prev => [...prev, data]);
        });

        return () => {
            socket.emit('not connected');
            socket.off();
        };
    }, []);

    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages(prev => [...prev, data]);
        });
        return () => {
            socket.off();
        };
    }, []);

    return (
        <div className="bg-zinc-900 w-screen h-screen flex justify-center items-center">
            <div className="bg-orange-300 h-[60%] w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] flex flex-col rounded-xl shadow-xl overflow-hidden">
                <div className="bg-red-600 h-[15%] flex items-center justify-between px-6">
                    <h2 className="text-black text-lg font-semibold">CHAT</h2>
                    <a href="/"> X</a>
                </div>

                <ReactScrollToBottom className="h-[70%] px-4 py-2 overflow-y-auto">
                    {messages.map((item, i) => (
                        <Message
                            key={i}
                            user={item.id === id ? '' : item.user}
                            message={item.message}
                            classs={item.id === id ? 'right' : 'left'}
                        />
                    ))}
                </ReactScrollToBottom>

                <div className="h-[15%] flex items-center">
                    <input
                        onKeyPress={(event) => event.key === 'Enter' && send()}
                        type="text"
                        id="chatInput"
                        className="w-[80%] p-4 border-t border-gray-300 outline-none text-base"
                        placeholder="Type your message..."
                    />
                    <button
                        onClick={send}
                        className="w-[20%] h-full bg-red-600 text-white hover:bg-red-700 transition duration-300"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;
