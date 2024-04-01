import React from "react";
import styled from "styled-components";
import { BsArrowLeft } from "react-icons/bs";
import video from "../videos/Avengers_ Infinity War Trailer.mp4";
import { useNavigate } from "react-router-dom";

export default function Player() {
  const navigate = useNavigate();

  return (
    <Container>
      <div className="player">
        <div className="backButton">
          <BsArrowLeft onClick={() => navigate(-1)} />
        </div>
        <video
          className="video"
          src={video}
          autoPlay
          loop
          controls
          muted
        ></video>
      </div>
    </Container>
  );
}

const Container = styled.div`
  .player {
    font-size: 10px;
    width: 100dvw;
    height: 100dvh;
    overflow: hidden;
  }
  .backButton {
    position: absolute;
    font-size: 3rem;
    padding: 2rem;
    z-index: 1;
    cursor: pointer;
  }
  .video {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;
