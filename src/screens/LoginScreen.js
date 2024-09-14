// src/LoginScreen.js
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import MailImg from "../assets/images/envelope.svg";
import PasswordImg from "../assets/images/lock-fill.svg";
import ShowPassword from "../assets/images/see-pass.svg";
import HidePassword from "../assets/images/hide-pass.svg";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (
        email === "amarnathdevshatwar07@gmail.com" &&
        password === "Amar@123"
      ) {
        toast.success("Logged in successfully");
        navigate("/admin/users");
      } else {
        toast.error("Invalid email or password");
      }
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <div>
      <div className="login-screen ">
        <div className="d-flex row">
          <div className="left-section d-flex justify-content-center align-items-center col-3 me-3">
            <div className="ms-5">
              <h1>Welcome</h1>
              <p>to the admin of FlyingPanda</p>
            </div>
          </div>
          <div className="login-container d-flex justify-content-center align-items-center col-8 ms-5 mt-2 mb-2 ">
            <div className="login-box">
              <h2>Admin Login</h2>
              <div className="login-form">
                <div className="name-div d-flex bg-white mb-3 ps-2">
                  <img src={MailImg} alt="Mail Icon"></img>
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control border-0 shadow-none "
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="pass-div d-flex bg-white mb-3 ps-2">
                  <img src={PasswordImg} alt="Mail Icon"></img>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="form-control border-0 shadow-none"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="bg-white border-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <img src={ShowPassword} alt="Show Password" />
                    ) : (
                      <img src={HidePassword} alt="Hide Password" />
                    )}
                  </button>
                </div>
                <button onClick={handleLogin} className="btn btn-primary">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginScreen;
