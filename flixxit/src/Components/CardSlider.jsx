import React, { useRef, useState } from "react";
import Card from "../Components/Card";
import styled from "styled-components";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function CardSlider({ data, title }) {
  const [showControls, setShowControls] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);
  const listRef = useRef();

  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().x - 70;
    if (direction === "left" && sliderPosition > 0) {
      listRef.current.style.transform = `translateX(${270 + distance}px)`;
      setSliderPosition(sliderPosition - 1);
    }
    if (direction === "right" && sliderPosition < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPosition(sliderPosition + 1);
    }
  };
  return (
    <Container
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="mainContainer">
        <h1>{title}</h1>
        <div className="wrapper">
          <div className={`slider-action ${showControls ? "none" : ""} `}>
            <AiOutlineLeft
              onClick={() => handleDirection("left")}
            ></AiOutlineLeft>
          </div>
          <div className="slider" ref={listRef}>
            {data.map((movie, index) => {
              return <Card movieData={movie} index={index} key={movie.id} />;
            })}
          </div>
          <div className={`slider-action right ${showControls ? "none" : ""}`}>
            <AiOutlineRight
              onClick={() => handleDirection("right")}
            ></AiOutlineRight>
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 0;
  overflow: hidden;
  margin: 0px;
  h1 {
    margin-left: 50px;
    margin-top: 30px;
  }
  .wrapper {
    .slider {
      display: flex;
      width: max-content;
      gap: 1rem;
      transform: translateX(0px);
      transition: 0.3s ease-in-out;
      margin-left: 50px;
      height: 350px;
    }
    .slider-action {
      display: flex;
      place-content: center;
      place-items: center;
      position: absolute;
      z-index: 99;
height: 296px;
    width: 150px;
    top: 94px;
    bottom: 0px;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
      }
    }
    .left {
      left: 0;
      background: linear-gradient(to left, #0000, #141414);
    }
    .right {
      right: 0;
      background: linear-gradient(to right, #0000, #141414);
    }
    .bALalJ {
      overflow: visible;
    }
  }
`;
