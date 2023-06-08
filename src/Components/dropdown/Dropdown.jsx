import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dropdown.scss";
import axios from "axios";
const API_KEY = "7a5563d316ae420e2224814b807a96d5";
const BASE_URL = "https://api.themoviedb.org/3";

const Dropdown = () => {

  const [genre, setGenre] = useState([]);

  useEffect(() => {
    const getAllGenre = async () => {
      const {
        data: { genres },
      } = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
      setGenre(genres);
    };
    getAllGenre();
  }, []);

  return (
    <div className="dropdown-content">
      {genre.map((item) => {
        return (
          <Link
            to={`/genre/${item.id}`}
            key={item.id}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Dropdown;
