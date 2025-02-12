import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/Login.css"; 

const Login = () => {
  const navigate = useNavigate(); 

  const handleClick = (event) => {
    event.preventDefault(); 
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>BookSearch</h2>
        <form>
          <input type="text" placeholder="Usuário" required />
          <input type="password" placeholder="Senha" required />
          <button onClick={handleClick}>Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
