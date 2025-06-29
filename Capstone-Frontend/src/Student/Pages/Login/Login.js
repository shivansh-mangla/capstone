import React from "react";
import "./Login.css"; 

const ICMPLogin = () => {
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
          <form>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="username@gmail.com"
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
            />
            <a href="#">Forgot Password?</a>
            <button type="submit">Sign in</button>
          </form>
          <p>
            Don't have an account yet? <a href="SignUp">Register Here</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ICMPLogin;