import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./css/Login.css"; 

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = async (event) => {
    event.preventDefault(); 

    try {
      const response = await fetch("https://webfullstack-back.onrender.com/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Usuário ou senha inválidos");
      }

      const data = await response.json();

      login(data.token);

      navigate("/home");

    } catch (error) {
      console.error("Erro de login:", error);
      alert(error.message); 
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>BookSearch</h2>
        <form>
          <input 
            type="text" 
            placeholder="Usuário" 
            required 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder="Senha" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button onClick={handleClick}>Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;