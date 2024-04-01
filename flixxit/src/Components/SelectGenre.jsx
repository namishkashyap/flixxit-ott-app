import React from "react";
import styled from "styled-components";
import { fetchDataByGenre } from "../store";
import { useDispatch } from "react-redux";

export default function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();
  return (
    <Select
      onChange={(e) => {
        dispatch(fetchDataByGenre({ genre: e.target.value, type }));
      }}
    >
      <select className="selectGenres">
        {genres.map((genre) => {
          return (
            <option value={genre.id} key={genre.id}>
              {genre.name}
            </option>
          );
        })}
      </select>
    </Select>
  );
}

const Select = styled.div`
  display: flex;
  margin-left: 4rem;
  .selectGenres {
    font-size: 1.2rem;
    background-color: #000000;
    color: #fff;
    padding: 0.5rem;
    cursor: pointer;
  }
`;
