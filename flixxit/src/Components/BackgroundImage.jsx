import React from "react";
import styled from "styled-components";
import background from "../asset/background-main.png";

export default function BackgroundImage() {
  return (
    <Container>
      <img src={background} alt="Background" className="signup-bg" />
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  overflow: hidden;
  .signup-bg {
    width: 100vw;
  }
`;
