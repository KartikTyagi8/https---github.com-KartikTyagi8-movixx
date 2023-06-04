import React, {useState, useEffect}  from 'react'
import axios from 'axios';
import FoundShows from '../../Components/foundComponents/FoundShows.jsx'
const API_KEY = "7a5563d316ae420e2224814b807a96d5";
const BASE_URL = "https://api.themoviedb.org/3";
const Movie = () => {
  const [movie,setMovie] = useState([]);
    useEffect(() => {
        const getAllMovie = async () => {
          const {data:{results}} = await axios.get( `${BASE_URL}/discover/movie?api_key=${API_KEY}`);
          setMovie(results);
        };
        getAllMovie();

      },[])
  return (
    <div className='movie-container'>
        <FoundShows mediaType={movie} title={"Movies"} type="movie"/>

    </div>
  )
}

export default Movie
