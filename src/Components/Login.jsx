import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../App.css"
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
    const navigation = useNavigate()
    const [show,setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  
    const handleLogin = () => {
        const registeredDatas = JSON.parse(localStorage.getItem("users")) || [];
        const user = registeredDatas.find(
          (user) => user.email === email && user.password === password
        );
      
        if (user) {
          toast.success("Login Successful!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            theme: "light",
            style: { backgroundColor: "green", color: "white" },
          });
      
          localStorage.setItem("isLoggedIn", "true");
      
          setTimeout(() => {
            navigation("/home");
          }, 3000);
        } else {
          toast.error("Invalid Email or Password!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
            theme: "dark",
            style: { backgroundColor: "red", color: "white" },
          });
        }
      };
      
  return (
    <div className="main-container">
      <div className="card-1 animate-slide-out">
        <h2 className="text-center mb-5" style={{color:"whitesmoke"}}>Login</h2>
        <form onSubmit={(e)=>{
          e.preventDefault()
          handleLogin()
        }}>
          <div className="mb-3">
            <label  htmlFor="email"  style={{color:"whitesmoke"}}>Email address</label>
            <input type="email"  id="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} value={email} required/>   
          </div>
          <div className="mb-3 parent-icon">
            <label  htmlFor="password"  style={{color:"whitesmoke"}}>Password</label>
            <input  type={show?"text":"password"}  id="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} value={password} required/>
            <span className="icon" onClick={()=>setShow(!show)}>
            
            {show ? (<VscEye style={{height:"25px",width:"25px"}}/>):(<VscEyeClosed style={{height:"25px",width:"25px"}}/>)}
            </span>
          </div>
          <button type="submit" className="btn btn-primary w-100 p-2 mt-3">Login</button>
        </form>
        <p className="mt-3 text-center" style={{color:"white"}}>
          Don't have an account? <Link to="/register" className="link-tag">Register</Link>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
