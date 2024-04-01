import React from "react";
import FlexxitLogo from "../Images/Flexxit_logo.svg";
import { FaSearch, FaUserAstronaut } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { API_END_POINT } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/userSlice";
import toast from "react-hot-toast";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.app.user);

  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_END_POINT}/logout`);
      console.log(res);

      if (res.data.success) {
        toast.success(res.data.message);
      }

      dispatch(setUser(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  //Search handler

  const searchHandler = async (e) => {
    console.log(user);
  };
  return (
    <Container>
      <div id="header-container">
        <header id="menuContainer">
          <div id="logo">
            <a onClick={() => navigate("/home")}>
              <img src={FlexxitLogo} alt="Logo" />
            </a>
          </div>
          <nav id="nav-bar">
            <ul id="menu-list">
              <li>
                <a className="home-bt" onClick={() => navigate("/home")}>
                  Home
                </a>
              </li>
              <li>
                <a className="movie-bt" onClick={() => navigate("/movie")}>
                  Movies
                </a>
              </li>
              <li>
                <a className="series-bt" onClick={() => navigate("/series")}>
                  Series
                </a>
              </li>
              <li>
                <a
                  className="subscriptions-bt"
                  onClick={() => navigate("/subscription")}
                >
                  Subscriptions
                </a>
              </li>
            </ul>
          </nav>
          <div id="rightNavIcon">
            <div className="searchBarContainer">
              <input
                onClick={searchHandler}
                placeholder="Search"
                className="searchBar"
                type="input"
              />
              <FaSearch />
            </div>
            <div className="profileContainer">
              <FaUserAstronaut className="profileIcon" />
              <div className="profileOption">
                <div className="dropDown">
                  <span className="profileName">{user.fullName}</span>
                  <button
                    type="submit"
                    className="settingButton"
                    onClick={() => navigate("/userlist")}
                  >
                    Mylist
                  </button>
                  <button
                    type="submit"
                    className="settingButton"
                    onClick={() => navigate("/userprofile")}
                  >
                    Setting
                  </button>

                  <button
                    type="submit"
                    onClick={logoutHandler}
                    className="settingButton"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </Container>
  );
}

const Container = styled.div`
  #header-container {
    position: relative;
    width: 100%;
    height: 182px;
    background-color: #00000000;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
  }

  #logo {
    /* width: 250px; */
    display: flex;
    justify-content: center;
  }
  #logo img {
    width: 120px;
  }

  #menuContainer {
    width: 80%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #menu-list {
    height: 80px;
    background-color: #0f0f0f;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px;
    border-radius: 18px;
    border: solid 6px #222222d4;
    box-sizing: border-box;
  }
  ul {
    list-style: none;
  }
  UL#menu-list li {
    height: 46px;
    background-color: #00000000;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    border-radius: 8px;
  }
  #menuContainer li > a {
    height: 100%;
    text-decoration: none;
    font-family: Arial, Helvetica, sans-serif;
    color: #bfbfbf;
    display: flex;
    align-items: center;
    padding: 0px 20px;
  }
  #menuContainer li > a:hover {
    background-color: #202020;
    color: #69e9e2;
    transition: 0.3s;
    border-radius: 8px;
  }
  #menuContainer li > a:is(:active, :link, :visited).active {
    background-color: #202020;
    color: rgb(255, 255, 255);
    transition: 0.3s;
  }
  #menuContainer li > a:last-child {
    border-right: solid 0px #2d2d2d;
  }
  .searchBar {
    height: 30px;
    width: 150px;
    border-radius: 8px;
    color: #fff;
    padding: 4px 10px 4px 10px;
    background: transparent;
    border: none;
    outline: none;
  }
  .searchBarContainer {
    display: flex;
    height: 34px;
    width: 200px;
    gap: 4px;
    border: solid 2px #69e9e2;
    border-radius: 8px;
    color: #fff;
    padding: 4px 10px 4px 10px;
    background: transparent;
    align-items: center;
  }
  .searchBarContainer img {
    width: 22px;
  }
  #rightNavIcon {
    display: flex;
    gap: 20px;
    align-items: center;
    color: #fff;
  }
  .MuiSvgIcon-root {
    font-size: 2rems;
    color: white;
  }
  .profileContainer {
    .profileIcon {
      cursor: pointer;
      font-size: 1.6rem;
    }
    .profileOption {
      display: none;
      background-color: #fff;
      color: #000;
      border-radius: 5px;
    }
    span {
      padding: 10px;
      cursor: pointer;
    }
    &:hover {
      .profileOption {
        display: flex;
        flex-direction: column;
        position: absolute;
      }
    }
  }
  a {
    cursor: pointer;
  }
  .dropDown {
    display: flex;
    position: absolute;
    background: #fff;
    flex-direction: column;
    width: max-content;
  }
  .settingButton {
    padding: 15px 5px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1rem;
  }
  .profileName {
    font-size: 1rem;
    font-weight: 500;
    background-color: #282828;
    color: #69e9e2;
  }
`;
