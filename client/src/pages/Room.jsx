import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainContext } from '../App';
import Messages from '../components/Messages';

const Room = () => {
  const { room, socket } = useContext(MainContext);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const [msg, setMsg] = useState("");

  const pressSend = (e) => {
    if(e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if(msg !== "") {
      const timeCreated = Date.now();
      socket.emit("send_message", { username, msg, timeCreated, room });
      setMsg("");
    }
  };

  const leaveRoom = () => {
    socket.emit("leave_room", { username, room });
    navigate("/", { replace: true });
  };

  return (
    <div className="container bg-slate-50 h-screen">
      <div className="flex">
        <div className="w-1/4">Left</div>
        <div className="w-1/2 border-2 h-screen relative flex flex-col justify-end">
          <div className="flex justify-between items-center px-4 py-2 bg-white absolute top-0 left-0 right-0 shadow-sm z-50">
            <span className="text-xl font-semibold">{room}</span>
            <button className="bg-red-500 text-white px-4 py-1 rounded text-sm hover:opacity-80" onClick={leaveRoom}>Leave</button>
          </div>
          <Messages socket={socket} />
          <div className="p-4 bg-white absolute bottom-0 left-0 right-0 flex justify-between items-center z-50">
            <input 
              type="text" 
              className="w-4/5 border-2 rounded-lg h-10 pl-2 focus:outline-none" 
              placeholder="type your message..." 
              onChange={(e)=>setMsg(e.target.value)}
              onKeyDown={pressSend}
              value={msg}
            />
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
            <button type="button" onClick={sendMessage} className="bg-blue-500 text-white px-8 py-1.5 rounded-lg">Send</button>
          </div>
        </div>
        <div className="w-1/4">Right</div>
      </div>
    </div>
  );
};

export default Room;