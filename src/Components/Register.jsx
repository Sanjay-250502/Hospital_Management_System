import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "../App.css";
import { VscEyeClosed, VscEye } from "react-icons/vsc";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterPage = () => {

  const navigation = useNavigate()
  const [regUser,setRegUser] = useState({
    username: "",
    email: "",
    password: "",
  })
  const [show,setShow] = useState(false)

  const handleChange = (e) => {
    setRegUser({
      ...regUser,[e.target.name]:e.target.value
    })
  }
  const handleRegister = () => {
    const {username,email,password} = regUser;

    if(username && email && password){
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      const existingUser = storedUsers.find((user) => user.email === email );
      if(existingUser) {
        toast.error("Email already exixts!", {
          position:"top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable:true,
          theme:"dark",
          style:{backgroundColor:"red", color:"white"},
        })
        return;
      }
      const newUser = [...storedUsers, {username,email,password}]
      localStorage.setItem("users", JSON.stringify(newUser))
      toast.success("Registered Successfully!", {
        position:"top-right",
        autoClose:3000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable:true,
        theme:"light",
        style:{backgroundColor:"green", color:"white"}
    })
      setRegUser({
        username: "",
        email: "",
        password: "",
      })
      setTimeout(()=>{
        navigation('/')
      },2000)  
    }
    else{
      toast.error("Invalid Credentails!", {
        position:"top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        draggable:true,
        theme:"dark",
        style:{backgroundColor:"red", color:"white"}
    } )
    }
  }
  return (
    <div className="main-container">
      <div className="card-1 animate-slide">
        <h2 className="text-center mb-4" style={{color:"whitesmoke"}}>Register</h2>
        <form onSubmit={(e)=>{
          e.preventDefault()
          handleRegister()
        }}>
          <div className="mb-4">
            <label htmlFor="username"  style={{color:"whitesmoke"}}>Username</label>
            <input type="text"  id="username" placeholder="Enter your username" value={regUser.username} name="username" onChange={handleChange} required/>
          </div>
          <div className="mb-4">
            <label htmlFor="email"  style={{color:"whitesmoke"}}>Email address</label>
            <input type="email"  id="email" placeholder="Enter your email" value={regUser.email} name="email" onChange={handleChange} required/>
          </div>
          <div className="mb-4 parent-icon">
            <label htmlFor="password"  style={{color:"whitesmoke"}}>Password</label>
            <input type={show ? "text":"password"}  id="password" placeholder="Enter your password" value={regUser.password} name="password" onChange={handleChange} required/>
            
            <span className="icon" onClick={()=>setShow(!show)}>
            {show ? ( <VscEye style={{height:"25px",width:"25px"}}/> ) : ( <VscEyeClosed style={{height:"25px",width:"25px"}}/> )}
            </span>

          </div>
          <button type="submit" className="btn btn-success w-100 p-2 mt-3">Register</button>
        </form>
        <p className="mt-3 text-center" style={{color:"whitesmoke"}}>
          Already have an account? <Link to="/" className="link-tag">Login</Link>
        </p>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default RegisterPage;