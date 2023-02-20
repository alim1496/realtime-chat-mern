import React, { useEffect, useState } from 'react';


const UserList = ({ socket }) => {
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        socket.on("new_user", (data) => {
          setUsers(data.users);
          setCount(data.users.length);
        });
        return () => socket.off("new_user");
      }, [socket]);


    return (
        <div className="w-1/4 p-2 text-end">
            <h1 className="font-semibold mb-1">Members ({count})</h1>
            {users.map((user, index) => (
                <h3 key={index} className="mb-2 text-sm">{user}</h3>
            ))}
        </div>
    );
}

export default UserList;