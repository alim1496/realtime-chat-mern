import React, { useEffect, useState } from 'react';
import Message from './Message';

const messages1 = [
    {
        "username": "haque",
        "msg": "Hello from messages", 
        "timeCreated": Date.now()
    }
];

const Messages = ({ socket }) => {
    const [messages, setMessages] = useState(messages1);

    useEffect(() => {
        socket.on("receive_message", ({ room, ...rest }) => {
            setMessages((state) => [...state, {...rest}]);
        });

        return () => socket.off("receive_message");
    }, [socket]);

    return (
        <div className="py-20 px-4 overflow-y-auto">
            {messages && messages.map((message, index) => (
                <Message message={message} key={index} />
            ))}
        </div>
    );
}

export default Messages;