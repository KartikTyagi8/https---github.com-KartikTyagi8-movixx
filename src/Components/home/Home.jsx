import React, { useEffect,useState } from "react";
import "./Home.scss";
// import logo from "../../assets/movix-logo.png";
import axios from 'axios'; 
// import Cards from "../cards/Cards";
import {BsFillPlayFill} from 'react-icons/bs'
import {AiOutlinePlus} from 'react-icons/ai'
import Row from "../row/Row";

const API_KEY = "7a5563d316ae420e2224814b807a96d5";
const BASE_URL = "https://api.themoviedb.org/3";
const UPCOMING = "upcoming";
const TOP_RATED = "top_rated";
const POPULAR = "popular";
const NOW_PLAYING = "now_playing";
// const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const IMAGE_BACK_DROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

const Home = () => {
  const [upcomingMovies,setUpcomingMovies] = useState([]);
  const [topratedMovies,setTopratedMovies] = useState([]);
  const [popularMovies,setPopularMovies] = useState([]);
  const [nowplayingMovies,setNowplayingMovies] = useState([]);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      const {data:{results}} = await axios.get( `${BASE_URL}/movie/${UPCOMING}?api_key=${API_KEY}`);
      setUpcomingMovies(results)
    };
    const fetchTopRatedMovies = async () => {
      const {data:{results}} = await axios.get( `${BASE_URL}/movie/${TOP_RATED}?api_key=${API_KEY}`);
      setTopratedMovies(results)
    };
    const fetchPopularMovies = async () => {
      const {data:{results}} = await axios.get( `${BASE_URL}/movie/${POPULAR}?api_key=${API_KEY}`);
      setPopularMovies(results)
    };
    const fetchNowPlayingMovies = async () => {
      const {data:{results}} = await axios.get( `${BASE_URL}/movie/${NOW_PLAYING}?api_key=${API_KEY}`);
      setNowplayingMovies(results)
    };
    fetchUpcomingMovies();
    fetchNowPlayingMovies();
    fetchTopRatedMovies();
    fetchPopularMovies();
  }, [])
  
  return (
    <section className="home" >
      <div className="banner" style = {{
        
        backgroundImage: upcomingMovies[1]? `url(${`${IMAGE_BACK_DROP_BASE_URL}${upcomingMovies[1].backdrop_path}`})`: "rgb(16,16,16)",

    }}>


      <div className="banner-details">
        {upcomingMovies[1]&& <h2 className="banner-title">{upcomingMovies[1].title}</h2>}
        {upcomingMovies[1]&& <h2 className="banner-overview">{upcomingMovies[1].overview}</h2>}
        
        <div className="btn-both">
          {upcomingMovies[1] && <button className="btn-watch-trailer"><BsFillPlayFill/> Play</button>}
        {upcomingMovies[1] && <button className="btn-add-watchlist"><AiOutlinePlus/> Watchlist</button>}
        </div>
      </div>
        
      </div>

      <Row title={"Upcoming Movies"} arr={upcomingMovies} type="movie"/>
      <Row title={"Top Rated"} arr={topratedMovies} type="movie"/>
      <Row title={"Popular Movies"} arr={popularMovies} type="movie"/>
      <Row title={"Now Playing"} arr={nowplayingMovies}  type="movie"/>
    </section>
  );
};

export default Home;
