import React, { useState } from 'react';
import { Link } from "react-router-dom";

// Font Awesome CDN (add to index.html):
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />

let user;

const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = "";
}

const Join = () => {
    const [name, setname] = useState("");

    return (
        <div className="bg-gradient-to-br from-gray-900 to-blue-900 w-screen h-screen flex justify-center items-center">
            <div className="w-full max-w-md flex flex-col items-center p-8 rounded-2xl shadow-2xl bg-white relative overflow-hidden">
                {/* Custom Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 glow pointer-events-none"></div>
                
                <div className="flex items-center space-x-2 mb-4">
                    <i className="fas fa-comment-dots text-blue-800 text-3xl"></i>
                    <h1 className="text-4xl font-bold text-blue-800 tracking-wide text-center">
                        Chat
                    </h1>
                </div>
                <label htmlFor="joinInput" className="text-sm text-gray-600 mb-2 self-start flex items-center space-x-1">
                    <i className="fas fa-user text-gray-500 text-sm"></i>
                    <span>Your Name</span>
                </label>
                <div className="relative w-full mb-6">
                    <input
                        onChange={(e) => setname(e.target.value)}
                        placeholder="Enter Your Name"
                        type="text"
                        id="joinInput"
                        className="w-full p-4 pl-10 border-2 border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 outline-none text-lg"
                    />
                    <i className="fas fa-user absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chat">
                    <button
                        onClick={sendUser}
                        disabled={!name}
                        className={`w-full p-4 text-white font-roboto text-lg border-none cursor-pointer transition-all duration-300 rounded-lg flex items-center justify-center space-x-2 ${
                            name
                                ? 'bg-blue-800 hover:bg-blue-900 active:bg-blue-950 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]'
                                : 'bg-gray-400 cursor-not-allowed'
                        }`}
                    >
                        <i className="fas fa-sign-in-alt"></i>
                        <span>Log In</span>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Join;
export { user };