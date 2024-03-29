import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import logo from "../../assets/movix-logo.png";
import "../login/Login.scss";
import axios from "axios";
import { Context, SERVER } from "../../index.js";
import toast from "react-hot-toast"

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated,setIsAuthenticated} = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
        const {data} = await axios.post(`${SERVER}/users/new`,{
            name,username, password
        },{
            headers:{
                "Content-Type": "application/json",
            },
            withCredentials:true,
        }
        );
        toast.success(data.message);
        setName("");
        setUsername("");
        setPassword("");
        setIsAuthenticated(true);
        localStorage.setItem("authToken", "yourAuthTokenValue");

        
        
    } catch (error) {
        toast.error(error.response.data.message);
        setIsAuthenticated(false);
        console.log(error);
    }
    
  };

  if(isAuthenticated){
    return <Navigate to={"/home"}/>
  }

  return (
    <div className="login">
      <header className="header">
        <Link className="logo-img" to="/">
          <img src={logo} alt="LogoImage" />
        </Link>
        <Link className="sign-up" to="/">
          {" "}
          Log In{" "}
        </Link>
      </header>
      <section className="full-section">
        <img
          className="banner"
          src="https://raw.githubusercontent.com/thatanjan/netflix-clone-yt/youtube/media//banner.jpg"
          alt=""
        />
        <form className="form-login" onSubmit={submitHandler}>
          <input
            type="text"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Register</button>
          <h4>or</h4>
          <Link to="/">Log In</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
