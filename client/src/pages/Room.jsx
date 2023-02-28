import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { MainContext } from '../App';
import Messages from '../components/Messages';
import UserList from '../components/UserList';
import { DEV_URL, PROD_URL } from '../Constants';

const Room = () => {
  const { room, socket, setSocket, setRoom } = useContext(MainContext);
  const navigate = useNavigate();
  const params = useParams();
  const username = localStorage.getItem("username");
  const [msg, setMsg] = useState("");
  const [current, setCurrent] = useState({});
  const [pickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    if(!socket) {
      setSocket(io(PROD_URL, { query: { username, room: params.id } }));
      setRoom(params.id);
    }
    fetchRoomDetails();
    window.addEventListener("popstate", () => setTimeout(leaveRoom, 0));
    return () => window.removeEventListener("popstate", () => setTimeout(leaveRoom, 0));
  }, []);

  const fetchRoomDetails = () => {
    fetch(`/api/v1/rooms/${params.id}`)
      .then(res => res.json())
      .then(({ result }) => setCurrent(result))
      .catch(() => {});
  };

  const pressSend = (e) => {
    if(e.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = () => {
    if(msg !== "") {
      const timeCreated = Date.now();
      const _data = { username, msg, timeCreated, room };

      fetch("/api/v1/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: localStorage.getItem("userID"), room: params.id, message: msg, timecreated: timeCreated })
      })
      .then(res => res.json())
      .then(() => {})
      .catch(() => {});
      
      socket.emit("send_message", _data);
      setMsg("");
    }
  };

  const leaveRoom = () => {
    socket.emit("leave_room", { username, room });
    navigate("/", { replace: true });
  };

  const handleEmojiSelect = (e) => {
    const _msg = msg + e.native;
    setMsg(_msg); 
  };

  return (
    <div className="bg-slate-50">
      <div className="container mx-auto h-screen">
        <div className="flex">
          <UserList socket={socket} />
          <div className="w-1/2 border-2 h-screen relative">
            <div className="flex justify-between items-center px-4 h-7/100 bg-white shadow-sm">
              <div className="flex items-center">
                <img src={current.cover} className="h-10 w-10 rounded-full" alt="cover" />
                <span className="text-xl font-semibold ml-2">{current.name}</span>
              </div>
              <button className="bg-red-500 text-white px-4 py-1 rounded text-sm hover:opacity-80" onClick={leaveRoom}>Leave</button>
            </div>
            <Messages socket={socket} roomID={params.id} />
            <div className="px-4 h-1/10 bg-white flex justify-between items-center">
              <input 
                type="text" 
                className="w-4/5 border-2 rounded-lg h-10 pl-2 focus:outline-none" 
                placeholder="type your message (max length: 500)" 
                onChange={(e)=>setMsg(e.target.value)}
                onKeyDown={pressSend}
                value={msg}
                maxLength="500"
              />
              {pickerVisible && <div className="absolute bottom-24 right-8"><Picker data={data} previewPosition="none" onEmojiSelect={handleEmojiSelect} /></div>}
              <svg onClick={()=>setPickerVisible(!pickerVisible)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer hover:opacity-70">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
              </svg>
              <button type="button" onClick={sendMessage} className="bg-blue-500 text-white px-8 py-1.5 rounded-lg">Send</button>
            </div>
          </div>
          <div className="w-1/4">
            <div className="p-2">
              <h3 className="font-bold">About</h3>
              <p className="leading-4 text-md">{current.description}</p>
            </div>
            <div className="p-2">
              <h3 className="font-bold">Rules</h3>
              <ul className="leading-4 text-md">
                <li>Please do not send spam</li>
                <li>Please do not send hate messages</li>
                <li>Please do not attack or abuse others</li>
                <li>Please be specific to the room goal</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;