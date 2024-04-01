import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Navbar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_END_POINT } from "../utils/constants";
import toast from "react-hot-toast";

export default function UserProfile() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.app.user);
  useEffect(() => {
    if (user === undefined) {
      navigate("/login");
    }
  }, []);

  return (
    <Container>
      {user && (
        <>
          <div className="container">
            <Navbar />
            <div className="mainWraper">
              <div className="data">
                <h1 className="headingText">
                  <span>User Profile</span>
                </h1>
                {/* <p className="upgradeText">Upgrade your plan</p> */}
              </div>
              <div className="userProfileInfoMain">
                <div className="userProfileInfo">
                  <div className="leftTitle">User Name</div>
                  <input type="button" value={user.fullName} />
                  <div className="leftTitle">Email</div>
                  <input type="button" value={user.email} />
                  <div className="leftTitle">Password</div>
                  <input type="button" value="******" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;

  .data {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }
  .headingText {
    margin: 10px 0px 0px 0px;
  }
  .headingText > span {
    color: #69e9e2;
  }
  .upgradeText {
    margin: 10px;
    font-size: 1.2rem;
  }
  .userProfileInfoMain {
    display: flex;
    place-items: center;
    justify-content: center;
    gap: 64px;
    height: 300px;
  }
  .mainWraper {
    display: flex;
    flex-direction: column;
    place-content: center;
    align-items: center;
    width: 100%;
    height: 80dvh;
  }
  .userProfileInfo {
    width: 500px;
    height: 200px;
    border: solid 2px #69e9e2;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    transition: 0.5s;
    overflow: hidden;

    > * {
      flex: 1 1 200px;
    }
    :nth-child(3) {
      border-bottom: solid 2px #fff;
      border-top: solid 2px #fff;
    }
    :nth-child(4) {
      border-bottom: solid 1px #e1e1e1;
      border-top: solid 1px #e1e1e1;
    }
    input {
      background-color: #191919;
      color: #e1e1e1;
      font-size: 1rem;
      outline: none;
      padding: 10px;
      border: none;
    }
  }
  .headName {
    font-size: 1.5rem;
    margin-bottom: 10px;
  }
  .price {
    font-size: 3rem;
    font-weight: 600;
    margin: -5px;
    color: #69e9e2;
  }
  .billedType {
    font-size: 1rem;
    margin: px;
  }
  .payButton {
    padding: 15px 50px;
    background-color: #e2e2e2;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 10px;
    border: none;
    margin-top: 50px;
    transition: 0.3s;
    &:hover {
      background-color: #69e9e2;
    }
  }
  .leftTitle {
    display: flex;
    place-items: center;
    justify-content: center;
    background-color: #e1e1e1;
    color: #191919;
    font-weight: 600;
    font-size: 1.2rem;
  }
  .updateUser {
    padding: 15px 50px;
    background-color: #e2e2e2;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 10px;
    border: none;
    transition: 0.3s;
    &:hover {
      background-color: #69e9e2;
    }
  }
`;
