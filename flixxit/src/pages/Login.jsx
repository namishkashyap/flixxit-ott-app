import React, { useState } from "react";
import styled from "styled-components";
import FlexxitLogo from "../Images/Flexxit_logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_END_POINT } from "../utils/constants";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import background from "../asset/background-main.png";

export default function Login(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.app.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    try {
      const res = await axios.post(`${API_END_POINT}/login`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
      dispatch(setUser(res.data.user));
      navigate("/home");
    } catch (error) {
      if (error.response.status === 401) {
        toast.error("Invalid email or password");
      }
    }
  };
  const myStyle = {
    backgroundImage: `url(${background})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    position: "fixed",
    width: "100%",
  };

  return (
    <Container>
      {/* <BackgroundImage></BackgroundImage> */}
      <div style={myStyle}></div>
      <div className="signupContainer">
        <div className="signupForm">
          <div className="headingText">
            <img src={FlexxitLogo} alt="Logo" id="logo" />
            <h2>Join Us</h2>
          </div>
          <form method="post" onSubmit={handleSubmit}>
            <div className="textArea">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="email"
                autoComplete="on"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="password"
                name="password"
                autoComplete="on"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="button">
              <button type="submit" className="signupButton">
                Login
              </button>
            </div>
          </form>
          <div className="loginButton">
            <p>Don't have an account?</p>
            <p className="loginText" onClick={() => navigate("/")}>
              Signup
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  .headingText {
    display: grid;
    place-items: center;
    justify-content: center;
    h2 {
      color: #69e9e2;
      font-size: 1.2rem;
      line-height: 1px;
      font-weight: 300;
    }
  }
  .signupContainer {
    display: flex;
    position: absolute;
    width: 100dvw;
    height: 100dvh;
    justify-content: center;
    align-items: center;
    background-color: #000000a3;
  }
  .signupForm {
    width: 350px;
    height: 450px;
    background-color: #0f0f0f;
    border: solid 10px #69e9e367;
    box-sizing: border-box;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
  }
  .textArea {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 5px;
    gap: 20px;
    input {
      width: 80%;
      height: 50px;
      padding: 10px 15px;
      border-radius: 5px;
      box-sizing: border-box;
    }
  }
  .button {
    width: 100%;
    display: flex;
    place-items: center;
    justify-content: center;
    margin-top: 10px;
    .signupButton {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60%;
      height: 30px;
      padding: 25px 20px;
      font-size: 1.2rem;
      font-weight: 600;
      border-radius: 5px;
      background-color: #69e9e2;
    }
    .signupButton:hover {
      background-color: #fff;
    }
  }
  #logo {
    width: 150px;
    display: flex;
    justify-content: center;
  }
  .loginButton {
    display: flex;
    width: 100%;
    place-items: center;
    justify-content: center;
    gap: 10px;
  }
  .loginText {
    background-color: transparent;
    color: #69e9e2;
    cursor: pointer;
    &:hover {
      color: #fff;
    }
  }
  form {
    width: 100%;
  }
`;
