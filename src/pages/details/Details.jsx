import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Cast from "../../Components/cast/Cast.jsx";
import { AiOutlinePlayCircle } from "react-icons/ai";
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";
import "./Details.scss";
import axios from "axios";
import RelatedSection from "../../Components/relatedSection/RelatedSection";
import CarouselVideo from "../../Components/carousel/CarouselVideo.jsx";
import RatingCircle from "../../Components/ratingCircle/RatingCircle.jsx";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const API_KEY = "7a5563d316ae420e2224814b807a96d5";
const BASE_URL = "https://api.themoviedb.org/3";
const Details = ({ type }) => {
  

  //Params
  const { id } = useParams();

  // const playVideos = () => {
  //   console.log("kartik");
  //   return (<CarouselVideo id={id}/>)
  // };

  const [videoSetup,setVideoSetup] = useState(false);

  // Recommended
  const [recommend, setRecommend] = useState([]);
  useEffect(() => {
    const getAllRecommended = async () => {
      const {
        data: { results },
      } = await axios.get(
        `${BASE_URL}/${type}/${id}/similar?api_key=${API_KEY}`
      );
      setRecommend(results);
    };
    getAllRecommended();
  }, []);
  // Recommended

  //Details about the movie
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const getAllDetails = async () => {
      const { data } = await axios.get(
        `${BASE_URL}/${type}/${id}?api_key=${API_KEY}`
      );
      setDetails(data);
    };
    getAllDetails();
  }, []);
  //Details about the movie

  //Cast Info
  const [castName, setCastName] = useState([]);
  useEffect(() => {
    const getCast = async () => {
      const {
        data: { cast },
      } = await axios.get(
        `${BASE_URL}/${type}/${id}/credits?api_key=${API_KEY}`
      );
      setCastName(cast);
    };
    getCast();
  }, []);
  //Cast Info

  const genre = details.genres;

  //Getting videos
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    
    const getVideos = async () => {
      try {
        const {
        data: { results },
      } = await axios.get(
        `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
      );
      setVideos(results);
      } catch (error) {
        console.log(error);
      }
      
    };
    getVideos();
  }, []);

  const filtereddVideos = videos.filter((item) => item.type === "Trailer");
  // console.log(filtereddVideos); //Movies with official trailer
  //Getting videos

  const [showMore, setShowMore] = useState(false);
  const text = details?.overview;
  const vote = details && details.vote_average ? details.vote_average.toFixed(1) : null;


  // const size = videos.size;
  const closeCarousel = () => {
    setVideoSetup(false);
  };

  return (
    <section className="home">
      <div className="upper-part">
        {videoSetup && <CarouselVideo videos={filtereddVideos} closeCarousel={closeCarousel}/>}
        <div
          className="poster"
          style={{
            backgroundImage: details
              ? `url(${`${IMAGE_BASE_URL}/${details.poster_path}`})`
              : "rgb(16,16,16)",
          }}
        ></div>
        <div className="basic-info">
          {details.original_title && <h1>{details.original_title}</h1>}
          {details.original_name && <h1>{details.original_name}</h1>}
          <p className="tagline">{details.tagline}</p>
          <div className="genre">
            {genre?.map((item) => {
              return <div className="genre-name">{item.name}</div>;
            })}
          </div>
          <div className="rating">
            <RatingCircle rating={vote} />
            {type === "movie" && (
              <div className="movie-trailer-watch">
                <AiOutlinePlayCircle
                  onClick={() => {
                    setVideoSetup(true);
                  }}
                />
                <h2 className="watch-trlr">Watch Trailer</h2>
              </div>
            )}
          </div>
          <h2>Overview</h2>
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

          <div className="run-time">
            <p className="class-p">Status: {details.status}</p>
            {details.release_date && (
              <p className="class-p">Released Date: {details.release_date}</p>
            )}
            {details.first_air_date && (
              <p className="class-p">Released Date: {details.first_air_date}</p>
            )}
            {details.runtime && (
              <p className="class-p">Runtime: {details.runtime} mins</p>
            )}
            {details.number_of_seasons && (
              <p className="class-p">
                Number of Seasons: {details.number_of_seasons}{" "}
              </p>
            )}
          </div>
        </div>
      </div>
      <Cast cast={castName} type={type} />
      <RelatedSection type={type} recommend={recommend} />
    </section>
  );
};

export default Details;
