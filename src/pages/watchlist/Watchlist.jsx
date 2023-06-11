import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SERVER } from "../..";
import { toast } from "react-hot-toast";
import FoundWatchlistShows from "../../Components/foundWatchlistShows/FoundWatchlistShows";

const Watchlist = () => {
  const { type } = useParams();
  console.log(type);
  const [watchlist, setWatchlist] = useState([]);
  useEffect(() => {
    axios
      .get(`${SERVER}/watchlist/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setWatchlist(res.data.list);
        // console.log(res.data.list);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }, []);

  const filteredWatchlist = watchlist.filter((item) => item.type === type);
  console.log(filteredWatchlist);

  return (
    <div className="tvshows-container">
      {filteredWatchlist.length > 0 ? (
        <FoundWatchlistShows mediaType={filteredWatchlist} type={type} />
      ) : (
        <div className="empty-text" style={{
          fontSize: "2rem",
          margin:"auto",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textalign: "center",
        }}>No Shows are added in Watchlist..Watch now!!</div>
      )}
    </div>
  );
};

export default Watchlist;
