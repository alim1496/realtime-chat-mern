import React, { useEffect, useState } from 'react';

const UserList = ({ socket }) => {
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        socket && socket.on("new_user", (data) => {
          setUsers(data.users);
          setCount(data.users.length);
        });
        return () => socket && socket.off("new_user");
    }, [socket]);


    return (
        <div className="w-1/4 py-2 text-end h-screen relative">
            <h1 className="font-semibold mb-1 absolute right-2">Members ({count})</h1>
            <div className="overflow-y-auto mt-8 h-90v">
                {users.map((user, index) => (
                    <h3 key={index} className="mb-2 mr-2 text-sm">{user}</h3>
                ))}
            </div>
        </div>
    );
}

export default UserList;