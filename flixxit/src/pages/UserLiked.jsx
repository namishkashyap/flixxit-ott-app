import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserLikedMovies } from "../store";
import styled from "styled-components";
import Navbar from "../Components/NavBar";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";

export default function Movie() {
  const navigate = useNavigate();
  const movies = useSelector((state) => state.flexxit.movies);
  const dispatch = useDispatch();
  const user = useSelector((store) => store.app.user);

  useEffect(() => {
    if (user === undefined) {
      navigate("/login");
    }
  }, []);
  const email = user?.email;
  useEffect(() => {
    if (email) {
      dispatch(getUserLikedMovies(email));
    }
  }, [email]);

  return (
    <Container>
      {user && (
        <>
          <div className="container">
            <Navbar />
            <div className="data">
              <h1>My List</h1>
              <div className="mylist">
                {movies.map((movie, index) => {
                  return (
                    <Card
                      movieData={movie}
                      index={index}
                      key={movie.id}
                      isliked={true}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 3rem;
    width: 100%;
    h1 {
      margin-left: 36px;
    }
  }
  .mylist {
    display: flex;
    flex-wrap: wrap;
    place-items: center;
    justify-content: flex-start;
    padding: 10px 36px;
    gap: 36px;
  }
`;
