import React, { useState } from "react";
import "./ForgetPass.css";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgetPass = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@thapar.edu")) {
      toast.error("Email must end with @thapar.edu");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:5000/api/forget-password", { email });
      if (res.status === 200) {
        toast.success("Password reset link sent to your email!");
        setEmail("");
        navigate("/"); // send user back to login after success
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        toast.error(error.response.data.error || "Request failed");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <div className="icmp_forget_background"></div>
      <div className="icmp_forget_overlay"></div>
      <img src="/logo.png" alt="Logo" className="icmp_forget_logo" />
      <div className="icmp_forget_container">
        <div className="icmp_forget_title">Improvement Course Management Portal</div>
        <div className="icmp_forget_form_box">
          <h2>ICMP</h2>
          <h3>Forgot Password</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Enter your Thapar Email</label>
            <input
              type="email"
              id="email"
              placeholder="username@thapar.edu"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Send Reset Link</button>
          </form>
          <p>
            Remembered your password?{" "}
            <a onClick={() => navigate("/login")}>Back to Login</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ForgetPass;
