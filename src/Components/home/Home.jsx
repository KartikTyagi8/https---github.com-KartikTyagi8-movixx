import React, { useEffect ,useState } from "react";
import "./Home.scss";
// import logo from "../../assets/movix-logo.png";
import axios from 'axios'; 
// import Cards from "../cards/Cards";
import {BsFillPlayFill} from 'react-icons/bs'
import {AiOutlinePlus} from 'react-icons/ai'
import Row from "../row/Row";
import CarouselBanner from "../carouselBanner/CarouselBanner";
import { toast } from "react-hot-toast";
import { SERVER } from "../..";
import { useLocation } from "react-router-dom";

const API_KEY = "7a5563d316ae420e2224814b807a96d5";
const BASE_URL = "https://api.themoviedb.org/3";
const UPCOMING = "upcoming";
const TOP_RATED = "top_rated";
const POPULAR = "popular";
const NOW_PLAYING = "now_playing";
const IMAGE_BACK_DROP_BASE_URL = "https://image.tmdb.org/t/p/w1280";

const Home = ({random}) => {
  const [upcomingMovies,setUpcomingMovies] = useState([]);
  const [topratedMovies,setTopratedMovies] = useState([]);
  const [popularMovies,setPopularMovies] = useState([]);
  const [nowplayingMovies,setNowplayingMovies] = useState([]);
  const [videoBannerSetup,setVideoBannerSetup] = useState(false);
  const [videos,setVideos] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Retrieve the last scroll position from localStorage
    const lastScrollPos = localStorage.getItem("scrollPosition");

    if (lastScrollPos) {
      window.scrollTo(0, parseInt(lastScrollPos));
      setScrollPosition(parseInt(lastScrollPos));
    }

    // Listen for scroll events and update the scroll position
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      localStorage.setItem("scrollPosition", currentPosition.toString());
      setScrollPosition(currentPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location]);
  
  

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
  useEffect(() => {
  const getBannerVideo = async () => {
    try {
      const {
      data: { results },
    } = await axios.get(
      `${BASE_URL}/movie/${upcomingMovies[random]?.id}/videos?api_key=${API_KEY}`
    );
    setVideos(results)
    
    } catch (error) {
      console.log(error)
    }
    
    
  };
  getBannerVideo();
}, [upcomingMovies,random])

  
  const text = upcomingMovies[random]?.overview;

  const closeCarousel = () => {
    setVideoBannerSetup(false);
  }

  const filtereddVideos = videos.filter((item) => item.type === "Trailer");

  
    return (
    <section className="home" >
      <div className="video-setup">
        {videoBannerSetup && <CarouselBanner videos={filtereddVideos} closeCarousel = {closeCarousel}/>}
      <div className="img-carousel-setup">
        <div className="banner" style = {{
        
        backgroundImage: upcomingMovies[random]? `url(${`${IMAGE_BACK_DROP_BASE_URL}${upcomingMovies[random]?.backdrop_path}`})`: "rgb(16,16,16)",

    }}></div>
      <div className="overlay">
        <div className="banner-details">
        {upcomingMovies[random]&& <h2 className="banner-title">{upcomingMovies[random]?.title}</h2>}
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
          {upcomingMovies[0] && <button className="btn-watch-trailer" onClick={()=>setVideoBannerSetup(true)}><BsFillPlayFill/></button>}
          <div className="watch-trailer">Watch Trailer</div> 
        </div>
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
