import React from "react";
import FlexxitLogo from "../Images/Flexxit_logo.svg";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="logo">
        <img src={FlexxitLogo} alt="Logo" id="logo-head" />
      </div>
      <button onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Log In" : " Sign Up"}
      </button>
    </Container>
  );
}
