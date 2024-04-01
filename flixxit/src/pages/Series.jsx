import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies, getGenres } from "../store";
import styled from "styled-components";
import Navbar from "../Components/NavBar";
import Slider from "../Components/Slider";
import NotAvailable from "../Components/NotAvailable";
import SelectGenre from "../Components/SelectGenre";
import { useNavigate } from "react-router-dom";

export default function Series() {
  const navigate = useNavigate();
  const genresLoaded = useSelector((state) => state.flexxit.genresLoaded);
  const movies = useSelector((state) => state.flexxit.movies);
  const genres = useSelector((state) => state.flexxit.genres);
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
    if (genresLoaded) dispatch(fetchMovies({ type: "tv" }));
  }, [genresLoaded]);
  return (
    <Container>
      {user && (
        <>
          <div className="container">
            <Navbar />
            <div className="data">
              <SelectGenre genres={genres} type="tv"></SelectGenre>
              {movies.length ? (
                <Slider movies={movies}></Slider>
              ) : (
                <NotAvailable></NotAvailable>
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 1rem;
  }
`;
