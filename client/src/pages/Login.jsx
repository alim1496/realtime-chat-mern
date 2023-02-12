import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const doLogin = () => {
    if (username === "" || password === "") return;

    fetch("http://localhost:4000/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
    .then(res => res.json())
    .then((res) => {
      console.log(res);
      localStorage.setItem("username", username);
      navigate("/", { state: { username }});
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="h-screen bg-login bg-cover bg-center flex items-center justify-center">
      {isLogin ? (
        <form className="w-96 text-center block bg-white rounded-xl p-4">
          <h3 className="mb-2 font-bold">Log in to your account</h3>
          <input 
            type="text" 
            className="border-2 border-solid border-slate-200 w-full px-2 py-1 rounded block mb-2 focus:outline-none focus:border-blue-500" 
            placeholder="Username" 
            onChange={(e)=>setUsername(e.target.value)}
          />
          <input 
            type="password" 
            className="border-2 border-solid border-slate-200 w-full px-2 py-1 rounded block mb-2 focus:outline-none focus:border-blue-500" 
            placeholder="Password" 
            onChange={(e)=>setPassword(e.target.value)}
          />
          <button 
            type="button" 
            className="mb-2 bg-blue-500 w-full py-2 rounded text-white font-bold hover:opacity-80" 
            onClick={doLogin}
          >
            Login
          </button>
          <h3 className="text-sm text-blue-500 cursor-pointer" onClick={() => setLogin(false)}>Create an account</h3>
        </form>
      ) : (
        <form className="w-96 text-center block bg-white rounded-xl p-4">
          <h3 className="mb-2 font-bold">Create your account</h3>
          <input type="text" className="border-2 border-solid border-slate-200 w-full px-2 py-1 rounded block mb-2 focus:outline-none focus:border-blue-500" placeholder="Username" />
          <input type="email" className="border-2 border-solid border-slate-200 w-full px-2 py-1 rounded block mb-2 focus:outline-none focus:border-blue-500" placeholder="Email" />
          <input type="password" className="border-2 border-solid border-slate-200 w-full px-2 py-1 rounded block mb-2 focus:outline-none focus:border-blue-500" placeholder="Password" />
          <input type="password" className="border-2 border-solid border-slate-200 w-full px-2 py-1 rounded block mb-2 focus:outline-none focus:border-blue-500" placeholder="Retype Password" />
          <button type="button" className="mb-2 bg-blue-500 w-full py-2 rounded text-white font-bold hover:opacity-80">Register</button>
          <h3 className="text-sm text-blue-500 cursor-pointer" onClick={() => setLogin(true)}>Go to login window</h3>
        </form>
      )}

    </div>
  );
};

export default Login;