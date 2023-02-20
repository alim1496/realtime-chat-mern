import React from 'react';
import TimeAgo from "react-timeago";

const Message = ({ message: { sender, message, timecreated } }) => {
    const isOwn = localStorage.getItem("username") === sender.username;
    const cStyle = isOwn ? "bg-blue-500 text-white ml-auto" : "bg-slate-100";

    const sDate = new Date(timecreated).toLocaleString().split(","); 
    const lDate = sDate[1].split(":");
    const rDate = sDate[1].split(" ");

    return (
        <div className={`border rounded-xl p-2 mb-2 w-fit max-w-sm overflow-hidden text-ellipsis ${cStyle}`}>
            <span className="text-xs opacity-80 leading-4">{sender.username}</span>
            <div className="text-sm leading-4">{message}</div>
            <span className="text-xs opacity-80 leading-4">
                {`${sDate[0]} ${lDate[0]}:${lDate[1]} ${rDate[2]}`}
            </span>
        </div>
    );
}

export default Message;
