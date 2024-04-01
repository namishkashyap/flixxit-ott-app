import React, { useEffect } from "react";
import styled from "styled-components";
import NavBar from "../Components/NavBar";
import BackgroundImage from "../Images/homeBackground.jpg";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import Slider from "../Components/Slider";

export default function Home() {
  const navigate = useNavigate();

  const genresLoaded = useSelector((state) => state.flexxit.genresLoaded);
  const movies = useSelector((state) => state.flexxit.movies);
  const dispatch = useDispatch();

  const user = useSelector((store) => store.app.user);
  useEffect(() => {
    if (user == undefined) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) dispatch(fetchMovies({ type: "all" }));
  }, [genresLoaded]);
  return (
    <Container>
      {user && (
        <>
          <div className="container">
            <NavBar />
            <div className="heroImage">
              <img
                src={BackgroundImage}
                alt="background"
                className="background-image"
              />
              <div className="gradient"></div>
              <div className="moveName">
                <h2>Avengers: Endgame</h2>
                <button
                  value="Play"
                  type="button"
                  className="playButtonBanner"
                  onClick={() => navigate("/player")}
                >
                  <FaPlay></FaPlay>Play
                </button>
              </div>
            </div>
          </div>
          <Slider movies={movies}></Slider>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  .heroImage {
    position: relative;
    width: 100%;
    overflow: hidden;
    display: flex;
    place-items: flex-start;
    justify-content: center;
    .background-image {
      position: relative;
      width: 80vw;
    }
    .gradient {
      position: absolute;
      width: 80vw;
      height: 100%;
      background: linear-gradient(to bottom, #fffff032, #000000);
      mix-blend-mode: hard-light;
    }
  }
  .moveName {
    bottom: 10%;
    position: absolute;
    display: flex;
    place-items: center;
    justify-content: center;
    flex-direction: column;
    h2 {
      font-size: 2rem;
    }
  }
  .playButtonBanner {
    padding: 12px 36px;
    font-size: 1.3rem;
    font-weight: 500;
    background-color: #69e9e2;
    border: none;
    border-radius: 6px;
    display: flex;
    place-items: center;
    justify-content: center;
    gap: 10%;
  }
`;
