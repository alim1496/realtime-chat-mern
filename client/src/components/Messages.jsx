import React, { useEffect, useState } from 'react';
import { CHAT_BOT } from '../Constants';
import Message from './Message';


const Messages = ({ socket, roomID }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetch(`/api/v1/chats/${roomID}`)
            .then(res => res.json())
            .then(({ result }) => {
                result.reverse();
                setMessages(result);
            })
            .catch(() => {});
    }, []);

    useEffect(() => {
        socket && socket.on("receive_message", (_data) => {
            setMessages((state) => [...state, {..._data}]);
        });

        return () => socket && socket.off("receive_message");
    }, [socket]);

    useEffect(() => {
        const msgCont = document.querySelector("#msg_container");
        msgCont.scrollTop = msgCont.scrollHeight;
    }, [messages]);

    return (
        <div className="py-20 px-4 overflow-y-auto" id="msg_container">
            {messages && messages.map((message, index) => {
                if(message.sender.username === CHAT_BOT) {
                    return <div key={index} className="py-2 text-xs w-fit m-auto opacity-70">{message.message}</div>
                } else {
                    return <Message message={message} key={index} />
                }
            })}
        </div>
    );
}

export default Messages;