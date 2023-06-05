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
  const [showMore, setShowMore] = useState(false);
  const text = upcomingMovies[0]?.overview;
  return (
    <section className="home" >
      <div className="overlay-img">
        <div className="banner" style = {{
        
        backgroundImage: upcomingMovies[0]? `url(${`${IMAGE_BACK_DROP_BASE_URL}${upcomingMovies[0].backdrop_path}`})`: "rgb(16,16,16)",

    }}>
        
      </div>
      <div className="overlay">
        <div className="banner-details">
        {upcomingMovies[0]&& <h2 className="banner-title">{upcomingMovies[0].title}</h2>}
        {/* {upcomingMovies[0]&& <h2 className="banner-overview">{upcomingMovies[0].overview}</h2>} */}
        <p className="overview">
            {text && text.length > 250
              ? showMore
                ? text
                : text.substring(0, 250)
              : text}
            {text && text.length > 250 && (
              <>
                {showMore ? (
                  <span
                    className="show-more"
                    onClick={() => setShowMore(!showMore)}
                  >
                    ...show less
                  </span>
                ) : (
                  <span
                    className="show-more"
                    onClick={() => setShowMore(!showMore)}
                  >
                    ...show more
                  </span>
                )}
              </>
            )}
          </p>
        
        <div className="btn-both">
          {upcomingMovies[0] && <button className="btn-watch-trailer"><BsFillPlayFill/></button>}
        {upcomingMovies[0] && <button className="btn-add-watchlist"><AiOutlinePlus/></button>}
        </div>
      </div>
      </div>
      
      </div>
      

      <div className="all_row">
      <Row title={"Upcoming Movies"} arr={upcomingMovies} type="movie"/>
      <Row title={"Top Rated"} arr={topratedMovies} type="movie"/>
      <Row title={"Popular Movies"} arr={popularMovies} type="movie"/>
      <Row title={"Now Playing"} arr={nowplayingMovies}  type="movie"/>
      </div>

      
    </section>
  );
};

export default Home;
