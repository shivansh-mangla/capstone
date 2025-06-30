import React, { useContext, useState } from "react";
import "./Login.css";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../../UserContext";
import { Link, useNavigate } from "react-router-dom";

const ICMPLogin = () => {
  const navigate = useNavigate();
  const {setStudent} = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notifySuccess = () => {
    toast.success('Successfully Logged In!!', {
      position: 'top-right',
      autoClose: 4000,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@thapar.edu")) {
      toast.error("Plz use Thapar email ID");
      return;
    }

    const data = {
      thapar_email: email,
      password: password
    };

    setEmail("");
    setPassword("");

    try {
      const res = await axios.post("http://localhost:5000/api/student/login", data);
      if(res.status === 202){
        notifySuccess();
        localStorage.setItem("ICMPtoken", res.data["token"]);
        setStudent(res.data["studentData"]);
        navigate("/student/dashboard");
      }
    } catch (error) {
      console.log(error);
      if(error.response){
        if(error.response.status === 400)
          toast.error(error.response.data.error);
      }
      else
        toast.error('Submission failed');
    }
  };

  return (
    <>
      <div className="background"></div>
      <div className="overlay"></div>
      <img src="/logo.png" alt="Logo" className="logo" />
      <div className="container">
        <div className="title">Improvement Course Management Portal</div>
        <div className="form-box">
          <h2>ICMP</h2>
          <h3>Login</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="username@thapar.edu"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <a href="#">Forgot Password?</a>
            <button type="submit">Sign in</button>
          </form>
          <p>
            Don't have an account yet? 
            <Link to="/student/signup">Register Here</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default ICMPLogin;