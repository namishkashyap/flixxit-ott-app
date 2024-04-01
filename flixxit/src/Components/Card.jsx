import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import video from "../videos/Avengers_ Infinity War Trailer.mp4";
import { IoPlayCircleSharp } from "react-icons/io5";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { API_END_POINT } from "../utils/constants";
import { removeFromLikedMovies } from "../store";

function Card({ movieData, isliked = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((store) => store.app.user);
  const dispatch = useDispatch();
  const email = user.email;
  const addToList = async (e) => {
    e.preventDefault();
    // const userNew = { user, movieData };
    try {
      await axios.post(
        `${API_END_POINT}/add`,
        { email, data: movieData },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      if (error.response.status === 401) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    if (user === undefined) {
      navigate("/login");
    }
  }, []);

  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="movie"
      />
      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="movie"
              onClick={() => navigate("/player")}
            />
            <video
              src={video}
              autoPlay
              loop
              muted
              onClick={() => navigate("/player")}
            ></video>
          </div>
          <div className=" info-container">
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons">
              <div className="control">
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() => navigate("/player")}
                ></IoPlayCircleSharp>
                <RiThumbUpFill title="Like"></RiThumbUpFill>
                <RiThumbDownFill title="Dislike"></RiThumbDownFill>
                {isliked ? (
                  <BsCheck
                    title="Remove From List"
                    onClick={() =>
                      dispatch(
                        removeFromLikedMovies({
                          movieId: movieData.id,
                          email,
                        })
                      )
                    }
                  ></BsCheck>
                ) : (
                  <AiOutlinePlus
                    title="Add to my list"
                    onClick={addToList}
                  ></AiOutlinePlus>
                )}
              </div>
              <div className="info">
                <BiChevronDown title="More Info"></BiChevronDown>
              </div>
            </div>
            <div className="genres">
              <ul>
                {movieData.geners.map((geners) => (
                  <li key={geners}>{geners}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  max-width: 230px;
  width: 230px;
  height: 100%;
  cursor: pointer;
  position: relative;
  img {
    border-radius: 0.5rem;
    width: 230px;
    height: 295px;
    z-index: 10;
    object-fit: cover;
    object-position: center;
    /* border: solid 10px; */
  }
  .hover {
    z-index: 90;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 10px;
    background-color: #141414;
    transition: 0.3s ease-in-out;
    .image-video-container {
      position: relative;
      height: 240px;
      img {
        width: 100%;
        height: 10px;
        object-fit: cover;
        top: 0;
        z-index: 4;
        position: absolute;
      }
      video {
        width: 100%;
        height: 260px;
        object-fit: cover;
        top: 0;
        z-index: 5;
        position: absolute;
      }
    }
    .info-container {
      padding: 1rem;
      gap: 0.5rem;
      margin-top: 10px;
    }
    .icons {
      display: flex;
      .control {
        display: flex;
        gap: 1rem;
      }
      svg {
        font-size: 1.8rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #646464;
        }
      }
    }
    .info {
      gap: 0.2rem;
    }
    .genres {
      display: flex;
      color: #b8b8b8;
      ul {
        display: flex;
        width: 100%;
        gap: 30px;
        margin: 4px;
        padding: 0px;
        font-size: 0.9rem;
        li {
          color: #b8b8b8;
          &:first-of-type {
            list-style-type: none;
          }
        }
      }
    }
  }
`;

export default Card;
