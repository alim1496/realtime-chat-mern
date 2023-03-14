import React, { useEffect, useRef, useState } from 'react';
import { throttle, debounce } from 'lodash';
import { CHAT_BOT } from '../Constants';
import Message from './Message';


const Messages = ({ socket, roomID }) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [more, setMore] = useState(true);
    const scrollPos = useRef(null);
    const _start = useRef(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const checkForMsg = (e) => {
        if(e.target.scrollTop === 0) {
            fetchMessages(_start.current);
        }
    };

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

    const fetchMessages = (start) => {
        if(more) {
            setLoading(true);
            fetch(`/api/v1/chats/${roomID}?start=${start ? start : ""}`)
            .then(res => res.json())
            .then(({ result, lastTime }) => {
                setLoading(false);
                if(result.length === 0) setMore(false);
                result.reverse();
                setMessages((state) => [...result, ...state]);
                _start.current = lastTime;
            })
            .catch(() => {
                setLoading(false);
            });
        }
    };

    return (
        <div className="h-83/100 px-4 overflow-y-auto" id="msg_container" onScroll={debounce(checkForMsg, 1000)}>
            {loading && <div className="w-fit mx-auto my-2">Loading...</div>}
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