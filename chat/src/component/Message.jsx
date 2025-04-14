import React from 'react';

const Message = ({ user, message, classs, system}) => {
    let customClass = system ? 'system' : classs;
    return (
        <div className={`message  ${customClass} animate-fade-in`}>
            {user ? `${user}: ${message}` : `You: ${message}`}
        </div>
    );
};

export default Message;
