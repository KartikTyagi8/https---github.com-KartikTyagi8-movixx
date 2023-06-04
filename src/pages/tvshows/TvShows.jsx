import React, {useState, useEffect}  from 'react'
import axios from 'axios';
import FoundShows from '../../Components/foundComponents/FoundShows.jsx'
const API_KEY = "7a5563d316ae420e2224814b807a96d5";
const BASE_URL = "https://api.themoviedb.org/3";
const TvShows = () => {
  const [tv,setTv] = useState([]);
    useEffect(() => {
        const getAllTv = async () => {
          const {data:{results}} = await axios.get( `${BASE_URL}/discover/tv?api_key=${API_KEY}`);
          setTv(results);
        };
        getAllTv();

      },[])
  return (
    <div className='tvshows-container'>
        <FoundShows mediaType={tv} title={"TV Shows"} type="tv"/>

    </div>
  )
}

export default TvShows
