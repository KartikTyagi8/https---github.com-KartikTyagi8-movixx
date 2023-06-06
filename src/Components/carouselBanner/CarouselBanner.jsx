import React,{useState} from 'react'
import { BsChevronLeft, BsChevronRight, BsX } from "react-icons/bs";
import ReactPlayer from "react-player";
import './CarouselBanner.scss'

const CarouselBanner = ({videos,closeCarousel}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    //   const [activePlayback,setActivePlayback] = useState(0);
      
      const handlePrev = () => {
        setActiveIndex((prevIndex) =>
          prevIndex === 0 ? videos.length - 1 : prevIndex - 1
        );
      };
    
      const handleNext = () => {
        setActiveIndex((prevIndex) =>
          prevIndex === videos.length - 1 ? 0 : prevIndex + 1
        );
      };
    
      const closeAndSetCarousel = () => {
        setActiveIndex(0);
        closeCarousel();
      };
      const youtubePlayerOptions = {
        playerVars: {
          controls: 1, // Enable YouTube controls
        },
      };
    
      return (
        <div className="carousel">
            <BsX className="close-icon" onClick={closeAndSetCarousel} />
          <div className="carousel-content">
            <BsChevronLeft className="carousel-control prev" onClick={handlePrev} />
            <BsChevronRight className="carousel-control next" onClick={handleNext} />
            
            {videos.map((video, index) => (
              <div
                key={index}
                className={`carousel-item ${index === activeIndex ? "active" : ""}`}
              >
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${video.key}`}
                  controls ={true}
                  height="100%"
                  width="100%"
                  playing={index === activeIndex}
                  config={youtubePlayerOptions}
                />
              </div>
            ))}
          </div>
        </div>
      );
}

export default CarouselBanner
