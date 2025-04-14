import React from 'react';

const Message = ({ user, message, classs }) => {
    return (
        <div className={`p-4 m-4 rounded-xl text-lg font-sans ${classs}`}>
            {user ? `${user}: ${message}` : `You: ${message}`}
        </div>
    );
};

export default Message;
