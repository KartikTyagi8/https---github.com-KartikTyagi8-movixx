import React from "react";
import { Link } from "react-router-dom";
import "./DropdownWatchlist.scss";


const DropdownWatchlist = () => {
    const options = [
        { id: "movie", label: "Movies" },
        { id: "tv", label: "TV Shows" }
      ];

  return (
    <div className="dropdown-content">
      {options.map((item,index) => {
        return (
          <Link
            to={`/watchlist/${item.id}`}
            key={index}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default DropdownWatchlist;
