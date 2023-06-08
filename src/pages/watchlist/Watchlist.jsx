import React,{useState,useEffect} from 'react'
import axios from 'axios';
import FoundShows from '../../Components/foundComponents/FoundShows';
import { useParams } from 'react-router-dom';
// const SERVER = "kartik"
const API_KEY = "7a5563d316ae420e2224814b807a96d5";
const BASE_URL = "https://api.themoviedb.org/3";

const Watchlist = () => {
    const {type} = useParams();
    console.log(type);
    const [watchlist,setWatchlist] = useState([]);
    useEffect(() => {
      try {
        const getAllWatchList = async () => {
          const {data:{results}} = await axios.get(`${BASE_URL}/discover/${type}?api_key=${API_KEY}`);
          setWatchlist(results);
        };
        getAllWatchList();
      } catch (error) {
        console.log(error)
      }
        

      },[type])
  return (
    <div className='tvshows-container'>
        <FoundShows mediaType={watchlist} type={type}/>

    </div>
  )
}

export default Watchlist

