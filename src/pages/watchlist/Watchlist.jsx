import React,{useState,useEffect} from 'react'
import axios from 'axios';
import FoundShows from '../../Components/foundComponents/FoundShows';
import { useParams } from 'react-router-dom';
import { SERVER } from '../..';
import { toast } from 'react-hot-toast';
import FoundWatchlistShows from '../../Components/foundWatchlistShows/FoundWatchlistShows';
const API_KEY = "7a5563d316ae420e2224814b807a96d5";
const BASE_URL = "https://api.themoviedb.org/3";

const Watchlist = () => {
    const {type} = useParams();
    console.log(type);
    const [watchlist,setWatchlist] = useState([]);
    useEffect(() => {
      axios.get(`${SERVER}/watchlist/my`, {
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
    console.log(filteredWatchlist)
    
  return (
    <div className='tvshows-container'>
        {filteredWatchlist ? <FoundWatchlistShows mediaType={filteredWatchlist} type={type}/> : "No Shows added to WatchList"}
    </div>
  )
}

export default Watchlist

