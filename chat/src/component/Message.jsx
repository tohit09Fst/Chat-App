import React from 'react';

const Message = ({ user, message, classs }) => {
    return (
        <div className={`message ${classs} animate-fade-in`}>
            {user ? `${user}: ${message}` : `You: ${message}`}
        </div>
    );
};

export default Message;
