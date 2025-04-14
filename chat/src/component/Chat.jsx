import React, { useEffect, useState } from 'react';
import ReactScrollToBottom from 'react-scroll-to-bottom';
import socketIo from "socket.io-client";
import { user } from './Join';
import Message from './Message';

let socket;
const ENDPOINT = "https://chat-app-311h.onrender.com";

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
        <div className="bg-gray-100 w-screen h-screen flex justify-center items-center">
            <div className="bg-white h-[80vh] w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] flex flex-col rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-blue-600 h-[10%] flex items-center justify-between px-6">
                    <h2 className="text-white text-xl font-bold">Chat Room</h2>
                    <a href="/" className="text-white text-2xl">&times;</a>
                </div>

                <ReactScrollToBottom className="h-[80%] px-4 py-2 overflow-y-auto bg-gray-50">
                    {messages.map((item, i) => (
                        <Message
                            key={i}
                            user={item.id === id ? '' : item.user}
                            message={item.message}
                            classs={item.id === id ? 'right' : 'left'}
                        />
                    ))}
                </ReactScrollToBottom>

                <div className="h-[10%] flex items-center bg-white border-t border-gray-200">
                    <input
                        onKeyPress={(event) => event.key === 'Enter' && send()}
                        type="text"
                        id="chatInput"
                        className="w-[85%] p-4 outline-none text-base placeholder-gray-500"
                        placeholder="Type your message..."
                    />
                    <button
                        onClick={send}
                        className="w-[15%] h-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                    >
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Chat;