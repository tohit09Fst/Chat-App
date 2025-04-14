import React, { useState } from 'react';
import { Link } from "react-router-dom";

let user;

const sendUser = () => {
    user = document.getElementById('joinInput').value;
    document.getElementById('joinInput').value = "";
}

const Join = () => {
    const [name, setname] = useState("");

    return (
        <div className="bg-zinc-900 w-screen h-screen flex justify-center items-center">
            <div className="w-[50%] flex flex-col items-center p-6 rounded-xl shadow-xl bg-white">
                <h1 className="text-3xl font-roboto text-black border-b-2 border-red-200 py-4 text-center w-full">
                    CHAT
                </h1>
                <input
                    onChange={(e) => setname(e.target.value)}
                    placeholder="Enter Your Name"
                    type="text"
                    id="joinInput"
                    className="w-[25vmax] p-4 border-none outline-none text-lg my-6 box-border"
                />
                <Link onClick={(event) => !name ? event.preventDefault() : null} to="/chat">
                    <button
                        onClick={sendUser}
                        className="w-[25vmax] p-4 bg-crimson text-white font-roboto text-lg border-none cursor-pointer transition-all duration-300 bg-red-700"
                    >
                        Login In
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Join;
export { user };
