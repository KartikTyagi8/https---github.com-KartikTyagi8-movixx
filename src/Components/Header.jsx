import React, { useState, useEffect } from "react";
import "../App.scss";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./dropdown/Dropdown.jsx";
import { ImSearch } from "react-icons/im";
import SearchResults from "./searchResults/SearchResults";
import { IoIosArrowDropdown } from "react-icons/io";
import logo from "../assets/movix-logo.png";
const API_KEY = "7a5563d316ae420e2224814b807a96d5";
const BASE_URL = "https://api.themoviedb.org/3";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const textColor = isDropdownOpen ? 'grey' : 'black';

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const navigate = useNavigate();

  const clickLogo = () => {
    navigate("/"); // Replace '/' with the path of your home page
  };
  const [searchQuery, setSearchQuery] = useState("");  //searched query
  const [searchResults, setSearchResults] = useState([]); 
  const [searchClick,setSearchClick] = useState(false);//searched query results
  const handleSearchClick = () => {
    setSearchClick(!searchClick);
  }


  useEffect(() => {
    const searchMovies = async () => {
      if (searchQuery) {
        const {
          data: { results },
        } = await axios.get(
          `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`
        );
        setSearchResults(results);
        console.log(results);
      } else {
        setSearchResults([]);
      }
    };

    searchMovies();
  }, [searchQuery]);

  console.log(searchQuery);
  

  

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
            {/* {" "} */}
            Categories <IoIosArrowDropdown />
            {isDropdownOpen && <Dropdown />}
          </div>
          <Link to="/watchlist"> WatchList </Link>
        </div>
        {searchClick && <div className="search-results-out">
          <input
          type="text"
          value={searchQuery}
          placeholder="Search for the movies and TV shows..."
          onChange={(e)=>setSearchQuery(e.target.value)}
        />
        
        </div>}
        {searchQuery?.length > 0 && <SearchResults search={searchResults} setSearchQuery={setSearchQuery} setSearchResults={setSearchResults}/>}
        
      </div>

      <ImSearch onClick={handleSearchClick}/>
    </nav>
  );
};

export default Header;
