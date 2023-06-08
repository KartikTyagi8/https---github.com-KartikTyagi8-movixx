import React, { useState, useEffect, useContext } from "react";
import "../App.scss";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Dropdown from "./dropdown/Dropdown.jsx";
import { ImSearch } from "react-icons/im";
import DropdownWatchlist from "./dropdownWatchlist/DropdownWatchlist";
import SearchResults from "./searchResults/SearchResults";
import { IoIosArrowDropdown } from "react-icons/io";
import logo from "../assets/movix-logo.png";
import { SERVER } from "../index.js";
import { Context } from "..";
import { toast } from "react-hot-toast";
const API_KEY = "7a5563d316ae420e2224814b807a96d5";
const BASE_URL = "https://api.themoviedb.org/3";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isWatchlistDropdownOpen, setIsWatchlistDropdownOpen] = useState(false);
  const {isAuthenticated,setIsAuthenticated} = useContext(Context);

  const logoutHandler = async () => {
    try {
      await axios.get(`${SERVER}/users/logout`,{
        withCredentials:true,
      });
  toast.success("Logout Successfully");
  setIsAuthenticated(false);
  localStorage.removeItem("authToken");

  navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }

  }
  // const textColor = isDropdownOpen ? 'grey' : 'black';

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleWatchlistDropdownToggle = () => {
    setIsWatchlistDropdownOpen(!isWatchlistDropdownOpen);
  };

  const navigate = useNavigate();

  const clickLogo = () => {
    navigate("/home"); // Replace '/' with the path of your home page
  };
  const [searchQuery, setSearchQuery] = useState(""); //searched query
  const [searchResults, setSearchResults] = useState([]);
  const [searchClick, setSearchClick] = useState(false); //searched query results
  const handleSearchClick = () => {
    setSearchClick(!searchClick);
  };

  useEffect(() => {
    const searchMovies = async () => {
      if (searchQuery) {
        const {
          data: { results },
        } = await axios.get(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`
        );
        setSearchResults(results);
      } else {
        setSearchResults([]);
      }
    };

    searchMovies();
  }, [searchQuery]);


  return (
    <nav className="header">
      <img src={logo} alt="logo" onClick={clickLogo} />
      <div className="center-header">
        <div className="options">
          <Link to="/tv"> TV Shows </Link>
          <Link to="/movie"> Movies </Link>
          <div
            className="categories"
            onMouseEnter={handleDropdownToggle}
            onMouseLeave={handleDropdownToggle}
          >
            Categories <IoIosArrowDropdown />
            {isDropdownOpen && <Dropdown />}
          </div>
          <div
            className="watchlist"
            onMouseEnter={handleWatchlistDropdownToggle}
            onMouseLeave={handleWatchlistDropdownToggle}
          >
            Watchlist <IoIosArrowDropdown />
            {isWatchlistDropdownOpen && <DropdownWatchlist />}
          </div>
          {/* <Link to="/watchlist"> WatchList </Link> */}
        </div>
        {searchClick && (
          <div className="search-results-out">
            <input
              type="text"
              value={searchQuery}
              placeholder="Search for the movies and TV shows..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        )}
        {searchQuery?.length > 0 && (
          <SearchResults
            search={searchResults}
            setSearchQuery={setSearchQuery}
            setSearchResults={setSearchResults}
          />
        )}
      </div>

      <ImSearch onClick={handleSearchClick} />
      <button className="logout" onClick={logoutHandler}>Logout</button>
    </nav>
  );
};

export default Header;
