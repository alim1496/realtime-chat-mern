import React, { useContext, useState } from "react";
import { MainContext } from "../App";

const categories = ["Sports", "Entertainment", "Travel", "Food", "News", "Others"];

const CreateModal = () => {
  const { showModal, setShowModal, setPublicRooms } = useContext(MainContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  
  const closeModal = () => {
    setError("");
    setName("");
    setDescription("");
    setCover("");
    setShowModal(false);
  };

  const submitData = () => {
    if(name === "" || description === "" || cover === "") return;

    const data = { name, description, cover, category, createdBy: localStorage.getItem("userID") };

    fetch("/api/v1/rooms/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then((res) => {
      const { success, message, result } = res;
      if(success) {
        setPublicRooms(rooms => [...rooms, result]);
        closeModal();
      } else {
        setError(message);
      }
    });
  };

  if(showModal) {
    return (
        <div className="fixed inset-0 flex justify-center items-center h-screen w-screen">
            <div className="bg-white shadow-lg p-4 w-96 rounded">
                <div className="text-center font-bold mb-2">Create a room</div>
                <form>
                    <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Room name" className="border-2 border-solid border-slate-200 w-full px-2 py-1 rounded block mb-2 focus:outline-none focus:border-blue-500" />
                    <select onChange={e=>setCategory(e.target.value)} className="border-2 border-solid border-slate-200 w-full p-1 rounded block mb-2 focus:outline-none focus:border-blue-500">
                        {categories.map((category, index) => (
                            <option value={category} key={index}>{category}</option>
                        ))}
                    </select>
                    <input type="text" value={cover} onChange={e=>setCover(e.target.value)} placeholder="Room cover url" className="border-2 border-solid border-slate-200 w-full px-2 py-1 rounded block mb-2 focus:outline-none focus:border-blue-500" />
                    <textarea rows="10" value={description} onChange={e=>setDescription(e.target.value)} placeholder="Room description" className="resize-none border-2 border-solid border-slate-200 w-full px-2 py-1 rounded block mb-2 focus:outline-none focus:border-blue-500"></textarea>
                    <div className="flex">
                        <span className="w-1/2 py-2 text-center font-bold cursor-pointer" onClick={closeModal}>Cancel</span>
                        <button type="button" className="mb-2 bg-blue-500 w-1/2 py-2 rounded text-white font-bold hover:opacity-80" onClick={submitData}>Submit</button>
                    </div>                
                </form>
                {error !== "" && <div className="text-red-500 text-center">{error}</div>}
            </div>
        </div>
      );
  } else {
    return null;
  }
};

export default CreateModal;