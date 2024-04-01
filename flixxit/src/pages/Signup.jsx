import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../Components/BackgroundImage";
import FlexxitLogo from "../Images/Flexxit_logo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_END_POINT } from "../utils/constants";
import toast from "react-hot-toast";

export default function Signup(props) {
  const navigate = useNavigate();
  const [fullName, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { fullName, email, password };
    try {
      const res = await axios.post(`${API_END_POINT}/signup`, user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
      navigate("/login");
    } catch (error) {
      toast.error("Email already exist");
    }
  };

  return (
    <Container>
      <BackgroundImage></BackgroundImage>
      <div className="signupContainer">
        <div className="signupForm">
          <div className="headingText">
            <img src={FlexxitLogo} alt="Logo" id="logo" />
            <h2>Join Us</h2>
          </div>
          <form method="post" onSubmit={handleSubmit}>
            <div className="textArea">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="userName"
                onChange={(e) => setName(e.target.value)}
              />
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
                Signup
              </button>
            </div>
          </form>
          <div className="loginButton">
            <p>Already have and account?</p>
            <p
              className="loginText"
              onClick={() => navigate(props.signup ? "/signup" : "/login")}
            >
              Login
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
    height: 500px;
    background-color: #0f0f0f;
    border: solid 10px #69e9e367;
    box-sizing: border-box;
    border-radius: 30px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    padding: 10px;
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
